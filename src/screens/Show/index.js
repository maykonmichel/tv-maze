import React, {memo, useCallback, useEffect, useMemo} from 'react';
import {FlatList, Image, SectionList, Text, View} from 'react-native';
import {useQuery} from '@apollo/client';
import {useNavigation, useRoute} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {WebView} from 'react-native-webview';

import noImgPortraitText from '../../assets/images/no-img-portrait-text.png';
import movieLoading from '../../assets/lottie/1961-movie-loading.json';
import Episode from '../../components/Episode';
import SHOW from '../../store/gql/query/SHOW';

import styles from './styles';

const {Navigator, Screen} = createMaterialTopTabNavigator();

const keyExtractor = ({id}) => id.toString();
const genreKeyExtractor = (item) => item;

const Show = () => {
  const {setOptions} = useNavigation();
  const {
    params: {id},
  } = useRoute();

  const {
    data: {
      episodes = [],
      seasons = [],
      show: {
        name,
        image,
        summary: html,
        genres,
        schedule: {time, days = []} = {},
      } = {},
    } = {},
    loading,
  } = useQuery(SHOW, {
    variables: {id},
  });

  const schedule = useMemo(() => time && `${days.join(', ')} at ${time}`, [
    days,
    time,
  ]);

  const sections = useMemo(
    () =>
      seasons.map(({number}) => ({
        number,
        data: episodes.filter(({season}) => season === number),
      })),
    [episodes, seasons],
  );

  const renderGenre = useCallback(({item}) => <Text>{item}</Text>, []);

  const renderItem = useCallback(
    ({item}) => <Episode show={name} {...item} />,
    [name],
  );

  const renderSectionHeader = useCallback(
    ({section: {number}}) => (
      <Text style={styles.header}>{`SEASON ${number}`}</Text>
    ),
    [],
  );

  useEffect(() => {
    setOptions({
      headerTitle: name || 'Loading show...',
    });
  }, [name, setOptions]);

  if (loading) return <LottieView source={movieLoading} autoPlay loop />;

  return (
    <>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={
              image
                ? {uri: image.medium.replace('http', 'https')}
                : noImgPortraitText
            }
            style={styles.image}
          />
        </View>
        <View style={styles.data}>
          <FlatList
            data={genres}
            extraData={genres}
            renderItem={renderGenre}
            keyExtractor={genreKeyExtractor}
          />
          <Text>{schedule}</Text>
        </View>
      </View>
      <Navigator
        tabBarOptions={{
          activeTintColor: '#fff',
          indicatorStyle: styles.indicatorStyle,
          style: styles.materialTopTabNavigator,
        }}>
        <Screen name="summary" options={{tabBarLabel: 'Summary'}}>
          {() => <WebView source={{html}} scalesPageToFit={false} />}
        </Screen>
        <Screen name="episodes" options={{tabBarLabel: 'Episodes'}}>
          {() => (
            <SectionList
              sections={sections}
              data={episodes}
              extraData={episodes}
              renderItem={renderItem}
              renderSectionHeader={renderSectionHeader}
              keyExtractor={keyExtractor}
              stickySectionHeadersEnabled
            />
          )}
        </Screen>
      </Navigator>
    </>
  );
};

export default memo(Show);
