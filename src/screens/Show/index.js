import React, {memo, useCallback, useEffect, useMemo} from 'react';
import {Image, SectionList, Text, View} from 'react-native';
import {useQuery} from '@apollo/client';
import {useNavigation, useRoute} from '@react-navigation/native';
import LottieView from 'lottie-react-native';

import noImgPortraitText from '../../assets/images/no-img-portrait-text.png';
import movieLoading from '../../assets/lottie/1961-movie-loading.json';
import Episode from '../../components/Episode';
import SHOW from '../../store/gql/query/SHOW';

import styles from './styles';

const keyExtractor = ({id}) => id.toString();

const Show = () => {
  const {setOptions} = useNavigation();
  const {
    params: {id},
  } = useRoute();

  const {
    data: {episodes = [], seasons = [], show: {name, image, summary} = {}} = {},
    loading,
  } = useQuery(SHOW, {
    variables: {id},
  });

  const sections = useMemo(
    () =>
      seasons.map(({number}) => ({
        number,
        data: episodes.filter(({season}) => season === number),
      })),
    [episodes, seasons],
  );

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
            source={image ? {uri: image.medium} : noImgPortraitText}
            style={styles.image}
          />
        </View>
        <Text style={styles.summary}>{summary}</Text>
      </View>
      <SectionList
        sections={sections}
        data={episodes}
        extraData={episodes}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        keyExtractor={keyExtractor}
        stickySectionHeadersEnabled
      />
    </>
  );
};

export default memo(Show);
