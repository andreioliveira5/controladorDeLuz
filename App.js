import React from 'react';
import {
  StyleSheet, Text, View, Button, FlatList,
  Switch, TouchableOpacity, ToastAndroid
} from 'react-native';
import BluetoothSerial from 'react-native-bluetooth-serial';

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isEnabledCont: false,
      isEnabledStart: false,
      isEnabledQuali: false,

    }
  }

  componentDidMount() {

    this.connect()

  }


  switchTesteStart(value) {
    if (value == true) {
      this.setState({ isEnabledStart: true });
      this.setState({ isEnabledCont: true });
      this.turnOn();
      this.controlerOn();
    } else {
      (value == false)
      this.setState({ isEnabledStart: false });
      this.setState({ isEnabledCont: false });
      this.turnOff();
      this.controlerOff();
    }
  }


  switchTesteConroler(value) {
    if (value == true) {
      this.setState({ isEnabledCont: true });
      this.controlerOn();
    } else {
      this.setState({ isEnabledCont: false });
      this.controlerOff();
    }
  }


  switchTesteQualidade(value) {
    if (value == true) {
      this.setState({ isEnabledQuali: true });
      this.setState({ isEnabledCont: false });
      this.controlerOff();
      this.qualidadeDeSono();
    } else {
      this.setState({ isEnabledQuali: false });
      this.setState({ isEnabledCont: true });
      this.controlerOn();
      this.qualidadeDeSonoOff();
    }
  }



  connect() {
    this.setState({ connecting: true });
    console.log("98:D3:31:F6:0E:C8");
    BluetoothSerial.connect("98:D3:31:F6:0E:C8")
      .then((res) => {
        console.log('Connected to device ${device.name}');
        ToastAndroid.show('Connected to device ${device.name}', ToastAndroid.SHORT);
      })
      .catch((err) => console.log(err.message))
  }


  turnOff() {
    BluetoothSerial.write("0")
      .then((res) => {
        console.log(res); +
          console.log('Sistema desligado')
        this.setState({ connected: true });
      })
      .catch((err) => console.log(err.message))
  }


  turnOn() {
    BluetoothSerial.write("1")
      .then((res) => {
        console.log(res);
        console.log('Sistema  Ligado')
        this.setState({ connected: true })
      })
      .catch((err) => console.log(err.message))
  }


  controlerOff() {
    BluetoothSerial.write("2")
      .then((res) => {
        console.log(res);
        console.log('Controlador Desativado')
        this.setState({ connected: true })
      })
      .catch((err) => console.log(err.message))
  }


  controlerOn() {
    BluetoothSerial.write("3")
      .then((res) => {
        console.log(res);
        console.log('Controlador Ativado')
        this.setState({ connected: true })
      })
      .catch((err) => console.log(err.message))
  }


  diminuirIntensidade() {
    BluetoothSerial.write("4")
      .then((res) => {
        console.log(res);
        console.log('Intencidade Diminuida')
        this.setState({ connected: true })
      })
      .catch((err) => console.log(err.message))
  }


  aumentarIntensidade() {
    BluetoothSerial.write("5")
      .then((res) => {
        console.log(res);
        console.log('Intencidade Aumentada')
        this.setState({ connected: true })
      })
      .catch((err) => console.log(err.message))
  }


  qualidadeDeSono() {
    BluetoothSerial.write("6")
      .then((res) => {
        console.log(res);
        console.log('Qualidade de Sono ativada')
        this.setState({ connected: true })
      })
      .catch((err) => console.log(err.message))
  }
  qualidadeDeSonoOff() {
    BluetoothSerial.write("7")
      .then((res) => {
        console.log(res);
        console.log('Qualidade de Sono Desativada')
        this.setState({ connected: true })
      })
      .catch((err) => console.log(err.message))
  }


  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <Text style={styles.toolbarHeader}>Controlador de Luz</Text>
        </View>

        <View style={styles.container}>
          <View style={styles.toolbar2}>
            <Text style={styles.toolbarTitle}>Ligar Controlador</Text>
            <View style={styles.toolbarButton}>
              <Switch
                trackColor={{ false: "#767577", true: "#ba6bff" }}
                thumbColor={this.state.isEnabledStart ? "#d3fc56" : "#585759"}
                onValueChange={(value) => this.switchTesteStart(value)}
                value={this.state.isEnabledStart}
              />
            </View>
          </View>


          <View style={styles.toolbar}>
            <Text style={styles.toolbarTitle}>Controle Automatico do Dispositivo</Text>
            <View style={styles.toolbarButton}>
              <Switch
                trackColor={{ false: "#767577", true: "#ba6bff" }}
                thumbColor={this.state.isEnabledCont ? "#d3fc56" : "#585759"}
                value={this.state.isEnabledCont}
                onValueChange={(value) => this.switchTesteConroler(value)}
              />
            </View>
          </View>


          <View style={styles.toolbar}>
            <Text style={styles.toolbarTitle}>Modo qualidade do Sono</Text>
            <View style={styles.toolbarButton}>
              <Switch
                trackColor={{ false: "#767577", true: "#ba6bff" }}
                thumbColor={this.state.isEnabledQuali ? "#d3fc56" : "#585759"}
                value={this.state.isEnabledQuali}
                onValueChange={(value) => this.switchTesteQualidade(value)}
              />
            </View>
          </View>

          <View style={styles.toolbar3}>
            <Text style={styles.toolbarTitle}>Controles Manuais da Intencidade</Text>
          </View>

          <View style={{ alignItems: 'center' }}>
            <View style={styles.buttonViwe}>
              <View style={styles.button}>
                <Button
                  onPress={this.diminuirIntensidade.bind(this)}
                  title="Diminnuir"
                  color="#91bd02"
                />
              </View>
              <View style={styles.button}>
                <Button
                  onPress={this.aumentarIntensidade.bind(this)}
                  title="Aumentar"
                  color="#91bd02"
                />
              </View>
            </View>
          </View>

        </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 0.9,
    backgroundColor: '#bd0250',
    alignItems: 'center',
  },
  header: {
    flex: 0.1,
    backgroundColor: '#850138',
    alignItems: "center",
  },
  toolbar: {
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    backgroundColor: '#bd0250',
  },
  toolbar2: {
    paddingTop: 80,
    paddingBottom: 20,
    flexDirection: 'row',
    backgroundColor: '#bd0250',
  },
  toolbarButton: {
    width: 30,
    marginTop: 3,
  },
  toolbarTitle: {
    textAlign: 'center',
    fontSize: 18,
    flex: 1,
    marginTop: 3,
    color: 'white'
  },
  deviceName: {
    fontSize: 19,
    color: "black"
  },
  deviceNameWrap: {
    margin: 10,
    borderBottomWidth: 1
  },
  buttonViwe: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
    marginLeft: 10,
    color: '#91bd02',
    alignItems: 'center',
  },
  FlatList: {
    marginTop: 50,
    height: 150,
    width: 300,
  },
  flatText: {
    backgroundColor: '#fff70a',
    flex: 1,
    padding: 20,
  },
  toolbarHeader: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 25,
    flex: 1,
    marginTop: 15,
    color: 'white'
  },
  toolbar3: {
    paddingTop: 200,
    paddingBottom: 20,
    flexDirection: 'row',
    backgroundColor: '#bd0250',
  },
});