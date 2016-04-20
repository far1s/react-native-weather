var React = require('react-native');

var {
  AppRegistry,
  MapView,
  View,
  Image,
  Text,
  StyleSheet
} =  React;

var Api = require('./src/api');

var Weather = React.createClass({
  getInitialState: function() {
    return {
      pin: {
        latitude: 0,
        longitude: 0
      },
      city: '',
      temperature: '',
      temp_min: '',
      temp_max: '',
      humidity: '',
      pressure: '',
      wind: '',
      recording: '',
      weatherMain: '',
      weatherDescription: '',
      weatherIcon: '',
      clouds: '',
      sunrise: '',
      sunset: '',
    }
  },
  render: function() {
    return <View style={styles.contaiener}>
      <MapView 
      annotations={[this.state.pin]}
      showsUserLocation={true}
      // followUserLocation={true}
      // onRegionChange={this.onRegionChange} // zu viele API Requests
      onRegionChangeComplete={this.onRegionChangeComplete}
      style={styles.map}
      >
      </MapView>
      <View style={styles.textWrapper}>
        <View style={styles.heading}>
          <Text style={[styles.textHeading]}>{this.state.city}</Text>
        </View>
        <View style={styles.textBox}>
          <View style={styles.textBoxWrap}>
            <Image
              style={styles.icon}
              source={{uri: 'http://openweathermap.org/img/w/' + this.state.weatherIcon + '.png'}}
            />
            <Text style={[styles.text]}>{this.state.weatherDescription}</Text>
          </View>
          <View style={[styles.textBoxWrap, {alignItems: 'flex-start'}]}>
            <Text style={[styles.text]}>Bedeckung: {this.state.clouds} %</Text>
            <Text style={[styles.text]}>Aufgang: {this.state.sunrise} Uhr</Text>
            <Text style={[styles.text]}>Untergang: {this.state.sunset} Uhr</Text>
          </View>
        </View>        
        <View style={styles.textBox}>
          <View style={styles.textBoxWrap}>
            <Text style={styles.textDescription}>Temperatur:</Text>
            <Text style={[styles.text, {fontSize: 30}]}> {this.state.temperature}</Text>
          </View>
          <View style={styles.textBoxWrap}>
            <Text style={styles.textDescription}>Min:</Text>
            <Text style={[styles.text, styles.textItem]}>{this.state.temp_min}</Text>
          </View>
          <View style={styles.textBoxWrap}>
            <Text style={styles.textDescription}>Min:</Text>
            <Text style={[styles.text, styles.textItem]}>{this.state.temp_min}</Text>
          </View>
        </View>
        
        <View style={styles.textBox}>
          <View style={styles.textBoxWrap}>
            <Text style={styles.textDescription}>Feuchtigkeit:</Text>
            <Text style={[styles.text, styles.textItem]}> {this.state.humidity} %</Text>
          </View>
          <View style={styles.textBoxWrap}>
            <Text style={styles.textDescription}>Windstärke:</Text>
            <Text style={[styles.text, styles.textItem]}> {this.state.wind} m/s</Text>
          </View>
          <View style={styles.textBoxWrap}>
            <Text style={styles.textDescription}>Luftdruck:</Text>
            <Text style={[styles.text, styles.textItem]}> {this.state.pressure} hPa</Text>
          </View>          
        </View>
        <View style={styles.footer}>
          <View style={{flex: 2, flexDirection: 'row'}}>
            <Text style={styles.textDescription}>Aufgenommen:</Text>
            <Text style={[styles.textDescription]}> {this.state.recording} Uhr</Text>
          </View>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Text style={[styles.textDescription, {textAlign: 'right'}]}>Made by Faris Brni &copy;</Text>
          </View>
        </View>
        
        
        
        
      </View>
    </View>
  },
  onRegionChangeComplete: function(region) {
    // console.log(region);
    this.setState({
      pin: {
        longitude: region.longitude,
        latitude: region.latitude
      }
    });
    Api(region.latitude, region.longitude)
      // .then(function(data) {
      //   this === ?????
      // });
      // .then((data) => {
      //   this === component
      // });
      .then((data) => {
        console.log(data);
        this.setState(data);
      });
  }
});

var styles = StyleSheet.create({
  contaiener: {
    flex: 1,
    borderColor: '#d2d2d2',
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#f5f5f5'
  },
  map: {
    flex: 4,
    marginTop: 20,
    margin: 10,
    // borderWidth: 1,
    // borderColor: '#d2d2d2',
    borderRadius: 7,
  },
  textWrapper: {
    flex: 3,
  },
  heading: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 5
  },
  textHeading: {
    color: '#242423',
    fontSize: 20
  },
  textBox: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#F5CB5C',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    padding: 5,
    borderRadius: 3,
  },
  icon: {
    height: 40,
    width: 40,
  },
  textBoxWrap: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column', 
    justifyContent: 'center',
    // borderColor: '#000',
    // borderWidth: 1
  },
  text: {
    fontFamily: 'Helvetica',
    color: '#333533',
  },
  textDescription: {
    fontSize: 10,
  },
  textItem: {
    fontSize: 20
  },
  footer: {
    flex: 1, 
    flexDirection: 'row', 
    marginLeft: 10, 
    marginRight: 10
  }
});

AppRegistry.registerComponent('weather', () => Weather);
