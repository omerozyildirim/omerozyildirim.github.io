package itu.com.tr.itugisindoorbeacontest;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.view.View;

public class RectangleView extends View {
    Paint paint = new Paint();

    public RectangleView(Context context) {
        super(context);
    }

    static int BEACON1_AVAILABLE = 1;
    static int BEACON2_AVAILABLE = 2;
    static int BEACON3_AVAILABLE = 4;
    static int BEACON4_AVAILABLE = 8;
    static double REAL_WIDTH = 9.0;
    static double REAL_HEIGHT = 9.0;
    static int flags = 0;
    static int width;
    static int height;
    static int pegman_x, pegman_y;

    int radius = 30;
    int margin = 50;

    double beacon1_distance = 0, beacon2_distance = 0;
    double beacon3_distance = 0, beacon4_distance = 0;
    static double intersectionPoint1_x, intersectionPoint1_y;


    @Override
    public void onDraw(Canvas canvas) {

        double a, b, c;
        double cos_alpha, sin_alpha;
        double x, y;

        width = getWidth();
        height = getHeight();

        paint.setAntiAlias(true);
        paint.setColor(Color.GRAY);

        if ((flags & BEACON1_AVAILABLE) != 0)
            paint.setColor(Color.GREEN);

        canvas.drawCircle(margin, margin, radius, paint);

        if ((flags & BEACON2_AVAILABLE) != 0)
            paint.setColor(Color.GREEN);
        else
            paint.setColor(Color.GRAY);

        canvas.drawCircle(margin, height - margin, radius, paint);

        if ((flags & BEACON3_AVAILABLE) != 0)
            paint.setColor(Color.GREEN);
        else
            paint.setColor(Color.GRAY);

        canvas.drawCircle(width - margin, margin, radius, paint);

        if ((flags & BEACON4_AVAILABLE) != 0)
            paint.setColor(Color.GREEN);
        else
            paint.setColor(Color.GRAY);

        canvas.drawCircle(width - margin, height - margin, radius, paint);

        paint.setColor(Color.BLACK);
        paint.setStrokeWidth(10);

        canvas.drawLine(margin + radius, margin , width - margin - radius, margin, paint);
        canvas.drawLine(width - margin, margin + radius, width - margin, height - margin - radius, paint);
        canvas.drawLine(width - margin - radius, height - margin, margin + radius, height - margin, paint);
        canvas.drawLine(margin, height - margin - radius, margin, margin + radius, paint);

        b = REAL_WIDTH;
        if (beacon1_distance < beacon3_distance) {
            c = beacon1_distance;
            a = beacon2_distance;
        }
        else {
            c = beacon3_distance;
            a = beacon4_distance;
        }

        cos_alpha = (b*b + c*c - a*a) / (2*b*c);
        sin_alpha = Math.sqrt(1 - Math.pow(cos_alpha, 2));

        x = cos_alpha*c;
        y = sin_alpha*c;

        double pixel_per_meter_x = (width - 2*margin) / REAL_WIDTH;
        double pixel_per_meter_y = (height - 2*margin) / REAL_HEIGHT;

        pegman_x = (int)(x*pixel_per_meter_x);
        pegman_y = (int)(y*pixel_per_meter_y);

        Bitmap pegman = BitmapFactory.decodeResource(getResources(), R.drawable.pegman);
        canvas.drawBitmap(pegman, pegman_x, pegman_y, paint);
    }

    public void setFlags(int _flags) {
        if (flags != _flags)
            flags = _flags;
    }

    public void setDistances(double d1, double d2, double d3, double d4) {
        beacon1_distance = d1;
        beacon2_distance = d2;
        beacon3_distance = d3;
        beacon4_distance = d4;
    }
}