import {StyleSheet, Text, View, Image, FlatList} from 'react-native'
import React, {useState, useEffect} from 'react';
//React native Icon
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'; //user-edit
import Entypo from 'react-native-vector-icons/Entypo'; //clock
import Axios from 'axios'; // Axios for fetching data from API 


const Data = () => {
  const [data, setData] = useState([]);
  const [loading,setLoading] = useState(true);
  useEffect(() => {
    const headers = {
      's-id':
        'CKEY0F1HNJGSZHJFQPYB5HBMJEM79K26YQDJTY0RX7MVPHGHXTKALSTVARSDAYKUGF2Y',
    };
    // GET request to fetch data from the API
    Axios.get('https://stagingsite.livelaw.in/dev/h-api/news', {headers})
      .then(response => {
        setLoading(false)
        // Fetched data
        setData(response.data.news);
        console.log(response.data.news, 'Line 19');
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  
  const calculateTimeAgo = (dateString) => {
    const currentTime= new Date();
    const newsDate = new Date(dateString);
    const timeDifference = currentTime -newsDate;

    if(timeDifference <60000) {
      // Less than 1 minutes
      return 'Just Now';
    }
    else if(timeDifference <3600000) {
      // Less than 1hrs
      const minutes  = Math.floor(timeDifference /60000);
      return `${minutes} minutes${minutes >1? 's':''} ago`;
    }else if(timeDifference <86400000) {
      // Less than 24 hrs
      const hours = Math.floor(timeDifference/3600000);
      return `${hours} hours${hours>1?'s':''} ago`;
    }else {
      return newsDate.toDateString();
    }
  }

  const renderItem = ({item}) => (
    <View style={styles.itemContainer} key={item.newsId}>
      {/* Loading Image*/}
      {item.thumbUrl ? (
        <Image source={{uri: item.thumbUrl}} style={styles.image} />
      ) : (
        <Image
          source={{
            uri: 'https://th.bing.com/th/id/R.0dd69e973b2300f8b17addaad738c9a6?rik=3Ww%2fCTgnkvdx1g&riu=http%3a%2f%2fhocalwire.com%2fimages%2flogo.png%3fwidth%3d500%26height%3d300&ehk=igoUjAE8dSsQ3vOG6XhbUFV8KLMHFTvLqzIQCpaZtz4%3d&risl=&pid=ImgRaw&r=0',
          }}
          resizeMode="contain"
          style={styles.image}
        />
      )}
      {/* Description for card. */}
      {item.description ? (
        <Text style={styles.description}>{item.description}</Text>
      ) : (
        <Text style={styles.description}>
          The most dangerous bakugan in the world is here.
        </Text>
      )}
      <View style={styles.viewSecondary}>
        <View style={styles.authorView}>
          <FontAwesome5 name="user-edit" size={24} color="gray" />
          <Text style={{color: 'gray'}}>{item.authorName}</Text>
        </View>
        <View style={styles.authorView}>
          <Entypo name="clock" size={24} color="gray" />
          <Text style={{color: 'gray'}}>{calculateTimeAgo(item.date_created)}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={{backgroundColor:'white'}}>
     {loading === true ?
     (
      <Text style={styles.loadingText}>Loading Please Wait....</Text>
     ):(
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.newsId.toString()}
      />
     )
     }
    </View>
  );
};

export default Data;

const styles = StyleSheet.create({
  container: {
    borderColor: 'red',
    borderWidth: 2,
    flex: 1,
    padding: 16,
  },
  itemContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    // alignItems:'center',
    alignSelf: 'center',
    width: '85%',
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    elevation: 4,
  },
  title: {
    color: 'gray',
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    marginTop: 8,
    color: 'gray',
    fontWeight: 'bold',
  },
  
  image: {
    borderWidth: 2,
    borderColor: '#c2e7ff',
    width: '100%',
    height: 200,
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 8,
  },
  authorView: {
    flexDirection: 'row',
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  viewSecondary: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 5,
    marginVertical: 10,
  },
  loadingText:{
    
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    alignContent:'center',
    fontSize:24,
    fontWeight:'bold',
    color:'gray'
  }
});