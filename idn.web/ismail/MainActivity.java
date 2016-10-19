package itu.com.tr.itugisindoorbeacontest;

import java.util.ArrayList;
import java.util.List;

import android.app.Activity;
import android.bluetooth.BluetoothAdapter;
import android.content.Intent;
import android.os.Bundle;
import android.graphics.Color;
import android.os.RemoteException;
import android.util.Log;
import android.widget.Toast;

import com.aprilbrother.aprilbrothersdk.Beacon;
import com.aprilbrother.aprilbrothersdk.BeaconManager;
import com.aprilbrother.aprilbrothersdk.BeaconManager.RangingListener;
import com.aprilbrother.aprilbrothersdk.Region;


public class MainActivity extends Activity {
    RectangleView rectView;
    private static final int REQUEST_ENABLE_BT = 1234;
    private static final String TAG = "ITUGISBEACON";
    private static final Region ALL_BEACONS_REGION = new Region("apr", null,
            null, null);
    private BeaconManager beaconManager;
    private ArrayList<Beacon> availableBeacons;
    double[] distances = new double[4];

    static int BEACON1_AVAILABLE = 1;
    static int BEACON2_AVAILABLE = 2;
    static int BEACON3_AVAILABLE = 4;
    static int BEACON4_AVAILABLE = 8;
    static int flags = 0;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        rectView = new RectangleView(this);
        rectView.setBackgroundColor(Color.WHITE);
        setContentView(rectView);
        init();
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (requestCode == REQUEST_ENABLE_BT) {
            if (resultCode == Activity.RESULT_OK) {
                connectToService();
            } else {
                Toast.makeText(this, "Bluetooth not enabled", Toast.LENGTH_LONG)
                        .show();
            }
        }
        super.onActivityResult(requestCode, resultCode, data);
    }

    private void connectToService() {
        beaconManager.connect(new BeaconManager.ServiceReadyCallback() {
            @Override
            public void onServiceReady() {
                try {
                    beaconManager.startRanging(ALL_BEACONS_REGION);
                    beaconManager.startMonitoring(ALL_BEACONS_REGION);
                } catch (RemoteException e) {

                }
            }
        });
    }

    private void init() {
        availableBeacons = new ArrayList<Beacon>();
        beaconManager = new BeaconManager(this);
        beaconManager.setRangingListener(new RangingListener() {

            @Override
            public void onBeaconsDiscovered(Region region,
                                            final List<Beacon> beacons) {
                availableBeacons.addAll(beacons);

                if (beacons == null || beacons.size() <= 0)
                    return;

                for (Beacon b : beacons) {
                    double distance = b.getDistance();
                    int major = b.getMajor();
                    int minor = b.getMinor();

                    switch (major) {
                        case 1:
                            if (minor == 0) {
                                flags |= BEACON1_AVAILABLE;
                                distances[0] = b.getDistance();
                            } else if (minor == 1) {
                                flags |= BEACON2_AVAILABLE;
                                distances[1] = b.getDistance();
                            }
                            break;
                        case 2:
                            if (minor == 0) {
                                flags |= BEACON3_AVAILABLE;
                                distances[2] = b.getDistance();
                            } else if (minor == 1) {
                                flags |= BEACON4_AVAILABLE;
                                distances[3] = b.getDistance();
                            }
                            break;
                        default:
                            break;
                    }

                    rectView.setFlags(flags);
                    rectView.setDistances(distances[0], distances[1], distances[2], distances[3]);
                    rectView.invalidate();

                    Log.i(TAG, "Major/Minor: " + major + "/" + minor + " Distance = " + distance);
                }
            }
        });
    }

    @Override
    protected void onStart() {
        super.onStart();

        if (!beaconManager.hasBluetooth()) {
            Toast.makeText(this, "Device does not have Bluetooth Low Energy",
                    Toast.LENGTH_LONG).show();
            return;
        }

        if (!beaconManager.isBluetoothEnabled()) {
            Intent enableBtIntent = new Intent(
                    BluetoothAdapter.ACTION_REQUEST_ENABLE);
            startActivityForResult(enableBtIntent, REQUEST_ENABLE_BT);
        } else {
            connectToService();
        }
    }

    @Override
    protected void onStop() {
        try {
            availableBeacons.clear();
            beaconManager.stopRanging(ALL_BEACONS_REGION);
        } catch (RemoteException e) {
            Log.d(TAG, "Error while stopping ranging", e);
        }
        super.onStop();
    }
}
