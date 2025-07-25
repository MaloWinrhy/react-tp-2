import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { CameraView, CameraType, useCameraPermissions, BarcodeScanningResult } from 'expo-camera';

export default function CameraScreen() {
  const [scanned, setScanned] = useState(false);
  const [barcode, setBarcode] = useState<string | null>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [facing] = useState<CameraType>('back');

  const handleBarCodeScanned = (result: BarcodeScanningResult) => {
    if (!scanned) {
      setScanned(true);
      setBarcode(result.data);
      Alert.alert('Code Barre Scanné', `Valeur: ${result.data}`);
    }
  };

  if (!permission) {
    return <View style={styles.center}><Text>Demande de permission...</Text></View>;
  }
  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text>Permission caméra requise</Text>
        <Text style={{ color: '#007AFF', margin: 16 }} onPress={requestPermission}>Autoriser la caméra</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <CameraView
        style={{ flex: 1 }}
        facing={facing}
        barcodeScannerSettings={{ barcodeTypes: ['ean13', 'ean8', 'upc_a', 'upc_e', 'code128', 'qr'] }}
        onBarcodeScanned={handleBarCodeScanned}
      >
        {barcode && (
          <View style={styles.barcodeBox}>
            <Text style={{ color: '#fff' }}>Code: {barcode}</Text>
          </View>
        )}
        {scanned && (
          <View style={styles.center}>
            <Text style={{ color: '#007AFF', margin: 16 }}>Scannez un autre code ?</Text>
            <Text style={{ color: '#007AFF', textDecorationLine: 'underline' }} onPress={() => { setScanned(false); setBarcode(null); }}>
              Réinitialiser
            </Text>
          </View>
        )}
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  barcodeBox: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    backgroundColor: '#222',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
});
