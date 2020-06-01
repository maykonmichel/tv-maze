import React, {memo, useCallback, useEffect, useMemo} from 'react';
import {Image, SectionList, Text, View} from 'react-native';
import {useQuery} from '@apollo/client';
import {useNavigation, useRoute} from '@react-navigation/native';

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
    data: {
      episodes = [],
      seasons = [],
      show: {name, image: {medium: uri} = {}, summary} = {},
    } = {},
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

  const renderItem = useCallback(({item}) => <Episode {...item} />, []);

  const renderSectionHeader = useCallback(
    ({section: {number}}) => (
      <Text style={styles.header}>{`SEASON ${number}`}</Text>
    ),
    [],
  );

  useEffect(() => {
    setOptions({
      headerTitle: name,
    });
  }, [name, setOptions]);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={{uri}} style={styles.image} />
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
