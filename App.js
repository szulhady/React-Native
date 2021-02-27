import { StatusBar } from 'expo-status-bar';
import React ,{useState, useEffect} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image} from 'react-native';

var mqtt = require('@taoqf/react-native-mqtt')
var client  = mqtt.connect('wss://tron.airmode.live:8083/mqtt')

client.on('connect', function () {
  client.subscribe('qwazx', function (err) {
    if (!err) {
      // client.publish('qwazx', 'Hello mqtt111')
    }
  })

})
export default function App() {
  const [O2,setO2] = useState(()=> '')
  const [LEL,setLEL] = useState(()=> '')
  const [VOC,setVOC] = useState(()=> '')


  useEffect(() => {
    client.on('message', function (topic, message) {
      // message is Buffer
      // const data = JSON.parse(message.toString())
      setO2(JSON.parse(message.toString()).O2)
      setLEL(JSON.parse(message.toString()).LEL)
      setVOC(JSON.parse(message.toString()).VOC)
      // console.log('hello')
      // const data= message
    })
  }, []); //only re-run the effect if new message comes in
  return (
    <View>
      <View style={styles.container}>
      <SafeAreaView style={styles.droidSafeArea}>
        <View style={styles.header}>
          <Text style={styles.headerText}>DASHBOARD</Text>
        </View>
        <StatusBar style="auto" />
      </SafeAreaView>
      </View>
      <View style={styles.logoView}>
        <Image
        source={require('./assets/SEAIC.png')}
        style={styles.logo}/>
        <Text style={styles.data}>O2 - {O2}</Text>
        <Text style={styles.data}>LEL - {LEL}</Text>
        <Text style={styles.data}>VOC - {VOC}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#333',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  droidSafeArea: {
    // flex: 1,
    // backgroundColor: npLBlue,
    paddingTop: Platform.OS === 'android' ? 25 : 0
},
  header:{
    // backgroundColor:'dodgerblue',
    padding:15,
    width:'100%',
    marginBottom:10,
    alignItems: 'center',
  },
  headerText:{
    color:'white',
    alignItems: 'center',
    fontSize:15
  },
  logo:{
    width:200,
    height:60
  }, 
  logoView:{
    marginTop:20,
    justifyContent:'center',
    alignItems:'center',
  },
  data:{
    marginTop:20,
    color:'red',
    fontSize:15
  }
});
