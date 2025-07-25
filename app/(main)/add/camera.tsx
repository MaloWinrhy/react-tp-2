import { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { CameraView, CameraType, useCameraPermissions, BarcodeScanningResult } from 'expo-camera';
import { useRouter } from 'expo-router';
import { PrimaryButton } from '@/components/buttons/PrimaryButton';

export default function CameraScreen() {
  const [scanned, setScanned] = useState(false);
  const [barcode, setBarcode] = useState<string | null>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [facing] = useState<CameraType>('back');
  const router = useRouter();
  const scanLock = useRef(false);

  useEffect(() => {
    if (permission?.granted === false) {
      Alert.alert('Permission Denied', 'Camera access is required to scan barcodes.');
    }
  }, [permission, scanned, barcode]);

  const handleBarCodeScanned = (result: BarcodeScanningResult) => {
    if (scanLock.current) return;
    scanLock.current = true;
    setScanned(true);
    setBarcode(result.data);
    setTimeout(() => {
      if (result.data) {
        router.push({
          pathname: '/add/details/[param]',
          params: { param: result.data, upc: result.data },
        });
      }
    }, 100);
  };

  const handleReset = () => {
    setScanned(false);
    setBarcode(null);
    scanLock.current = false;
  };

  if (!permission) {
    return <View style={styles.center}><Text>Demande de permission...</Text></View>;
  }
  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text>Permission caméra requise</Text>
        <PrimaryButton label="Autoriser la caméra" onPress={requestPermission} style={{ margin: 16 }} />
      </View>
    );
  }

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
          <PrimaryButton label="Scannez un autre code" onPress={handleReset} style={{ margin: 16, width: 300 }} />
          <PrimaryButton label="Retour à la recette" onPress={() => router.replace('/add')} variant="secondary" style={{ marginTop: 8, width: 300 }} />
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
