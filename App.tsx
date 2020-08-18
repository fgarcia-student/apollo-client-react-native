/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  ActivityIndicator,
  ScrollView,
  // Button,
  // Image,
} from 'react-native';

import {gql, useQuery, NetworkStatus} from '@apollo/client';

import {
  // Header,
  // LearnMoreLinks,
  Colors,
  // DebugInstructions,
  // ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  // dogImage: {
  //   width: 300,
  //   height: 300,
  // },
  // dogList: {
  //   position: 'absolute',
  //   bottom: 0,
  //   display: 'flex',
  //   flexDirection: 'row',
  //   paddingBottom: 20,
  // },
  bookList: {
    display: 'flex',
  },
  book: {
    position: 'relative',
    height: 150,
    padding: 20,
    backgroundColor: '#ffffff',
    margin: 10,
  },
  book__title: {
    flexDirection: 'row',
    margin: 10,
    // color: '#ffffff',
  },
  book__title__label: {
    width: 60,
    // color: '#ffffff',
  },
  book__title__value: {
    // color: '#ffffff',
  },
  book__author: {
    flexDirection: 'row',
    margin: 10,
    // color: '#ffffff,
  },
  book__author__label: {
    width: 60,
    // color: '#ffffff,
  },
  book__author__value: {
    // color: '#ffffff,
  },
  book__read: {
    //
    position: 'absolute',
    bottom: 0,
    right: 0,
    margin: 20,
    backgroundColor: 'darkgreen',
  },
  book__read__label: {
    //
    padding: 10,
    color: 'white',
  },
});

// const GET_DOGS = gql`
//   query GetDogs {
//     getDogs {
//       id
//       name
//       img
//     }
//   }
// `;

// const GET_IMAGE_BY_DOG_ID = gql`
//   query GetImageByDogId($id: String!) {
//     getDogById(id: $id) {
//       id
//       img
//     }
//   }
// `;

// interface QueryResult {
//   getDogs: Array<{
//     id?: string;
//     name?: string;
//     img?: string;
//   }>;
// }

const GET_BOOKS = gql`
  query GET_BOOKS {
    books {
      title
      author {
        name
      }
    }
  }
`;

interface QueryResult {
  books: Array<{
    title: string;
    author: {
      name: string;
    };
  }>;
}

const MAX_RETRY = 5;

const showLoadingMask = [
  NetworkStatus.fetchMore,
  NetworkStatus.loading,
  NetworkStatus.poll,
  NetworkStatus.error,
];

const App = () => {
  const [errorCount, setErrorCount] = React.useState(0);
  const {data, error, stopPolling, networkStatus} = useQuery<QueryResult>(
    GET_BOOKS,
    {
      pollInterval: 2000,
      onError: () => {
        if (errorCount > MAX_RETRY) {
          stopPolling();
        } else {
          setErrorCount((c) => c + 1);
        }
      },
      onCompleted: () => {
        stopPolling();
      },
      notifyOnNetworkStatusChange: true,
    },
  );

  // const {data, error, stopPolling, networkStatus, client} = useQuery<
  //   QueryResult
  // >(GET_DOGS, {
  //   pollInterval: 2000,
  //   onError: () => {
  //     if (errorCount > MAX_RETRY) {
  //       stopPolling();
  //     } else {
  //       setErrorCount((c) => c + 1);
  //     }
  //   },
  //   onCompleted: () => stopPolling(),
  //   notifyOnNetworkStatusChange: true,
  // });

  const showError = React.useMemo(
    () => error !== undefined && errorCount > MAX_RETRY,
    [error, errorCount],
  );

  // const [selectedDog, setSelectedDog] = React.useState('');
  // const handleButtonPress = React.useCallback(
  //   (id: string) => async () => {
  //     try {
  //       const imgData = await client.query({
  //         query: GET_IMAGE_BY_DOG_ID,
  //         variables: {id},
  //       });
  //       setSelectedDog(imgData.data?.getDogById?.img);
  //       const cacheData = client.readQuery<QueryResult>({query: GET_DOGS});
  //       let updatedList: any[] = [];
  //       if (cacheData) {
  //         updatedList = cacheData?.getDogs;
  //         const updatedIndex = updatedList?.findIndex((d) => d.id === id);
  //         const updated = updatedList?.[updatedIndex];
  //         if (updated) {
  //           updated.img = imgData.data?.getDogById?.img;
  //           updatedList[updatedIndex] = updated;
  //         }
  //       } else {
  //         updatedList = [imgData.data?.getDogById];
  //       }
  //       client.writeQuery({
  //         query: GET_DOGS,
  //         data: {
  //           getDogs: updatedList,
  //         },
  //       });
  //     } catch (e) {
  //       //
  //     }
  //   },
  //   [client],
  // );

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={'#ffffff'} />
      <SafeAreaView style={{height: '100%', backgroundColor: '#f0f8ff'}}>
        {/* <Header /> */}
        {showError && <Text>Error {`${error}`}</Text>}
        <ScrollView style={styles.bookList}>
          {showLoadingMask.includes(networkStatus) && !showError && (
            <ActivityIndicator size="large" />
          )}
          {data?.books?.map((b) => {
            return (
              <View key={b.title} style={styles.book}>
                <View style={styles.book__title}>
                  <Text style={styles.book__title__label}>Title:</Text>
                  <Text style={styles.book__title__value}>{b.title}</Text>
                </View>
                <View style={styles.book__author}>
                  <Text style={styles.book__author__label}>Author:</Text>
                  <Text style={styles.book__author__value}>
                    {b.author?.name}
                  </Text>
                </View>
                <View
                  style={styles.book__read}
                  onTouchEndCapture={(e) => {
                    console.log(e);
                  }}>
                  <Text style={styles.book__read__label}>Read Me!</Text>
                </View>
              </View>
            );
          }) ?? null}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
/*
<View>
  {selectedDog !== '' && (
    <Image
      source={{uri: selectedDog}}
      // eslint-disable-next-line react-native/no-inline-styles
      style={{width: '100%', height: 600}}
    />
  )}
</View>
<View style={styles.dogList}>
  {data?.getDogs?.map((dog) => (
    // eslint-disable-next-line react-native/no-inline-styles
    <View key={dog.id!} style={{flex: 1, display: 'flex'}}>
      <Button
        onPress={handleButtonPress(dog.id!)}
        title={`${dog.name}`}
      />
      <Image
        source={{uri: dog.img || 'https://via.placeholder.com/150'}}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{width: 50, height: 50}}
      />
    </View>
  )) ?? null}
</View>
*/
export default App;
