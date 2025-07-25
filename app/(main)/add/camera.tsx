import { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { CameraView, CameraType, useCameraPermissions, BarcodeScanningResult } from 'expo-camera';
import { useRouter } from 'expo-router';

export default function CameraScreen() {
  const [scanned, setScanned] = useState(false);
  const [barcode, setBarcode] = useState<string | null>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [facing] = useState<CameraType>('back');
  const router = useRouter();
  const scanLock = useRef(false);

  useEffect(() => {
    console.log('Permission:', permission);
    console.log('Scanned:', scanned);
    console.log('Barcode:', barcode);
  }, [permission, scanned, barcode]);

  const handleBarCodeScanned = (result: BarcodeScanningResult) => {
    if (scanLock.current) return;
    scanLock.current = true;
    console.log('Barcode scanned result:', result);
    setScanned(true);
    setBarcode(result.data);
    setTimeout(() => {
      if (result.data) {
        console.log('Navigating to details with UPC:', result.data);
        router.push({
          pathname: '/add/details/[param]',
          params: { param: result.data, upc: result.data },
        });
      } else {
        console.log('No barcode data found in result');
      }
    }, 100);
  };

  const handleReset = () => {
    setScanned(false);
    setBarcode(null);
    scanLock.current = false;
  };

  if (!permission) {
    console.log('Permission object is null');
    return <View style={styles.center}><Text>Demande de permission...</Text></View>;
  }
  if (!permission.granted) {
    console.log('Permission not granted');
    return (
      <View style={styles.center}>
        <Text>Permission caméra requise</Text>
        <Text style={{ color: '#007AFF', margin: 16 }} onPress={requestPermission}>Autoriser la caméra</Text>
      </View>
    );
  }

  console.log('Rendering CameraScreen, scanned:', scanned);
  return (
    <View style={{ flex: 1 }}>
      {!scanned ? (
        <CameraView
          style={{ flex: 1 }}
          facing={facing}
          barcodeScannerSettings={{ barcodeTypes: ['ean13', 'ean8', 'upc_a', 'upc_e', 'code128', 'qr'] }}
          onBarcodeScanned={handleBarCodeScanned}
        />
      ) : (
        <View style={styles.center}>
          <Text style={{ color: '#007AFF', margin: 16 }}>Scannez un autre code ?</Text>
          <Text style={{ color: '#007AFF', textDecorationLine: 'underline' }} onPress={handleReset}>
            Réinitialiser
          </Text>
          {barcode && (
            <View style={styles.barcodeBox}>
              <Text style={{ color: '#fff' }}>Code: {barcode}</Text>
            </View>
          )}
        </View>
      )}
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
