package com.vooler.module;

import android.annotation.SuppressLint;
import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import android.util.Log;

import java.util.ArrayList;
import java.util.Calendar;

public class StepsDBHelper extends SQLiteOpenHelper {
  private static final int DATABASE_VERSION = 1;
  private static final String DATABASE_NAME = "StepsDatabase";
  private static final String TABLE_STEPS_SUMMARY = "StepsSummary";
  private static final String ID = "id";
  private static final String STEPS_COUNT = "stepscount";
  private static final String CREATION_DATE = "creationdate";//Date format is yyyy/mm/dd
  private String TAG = "React Native Android Module";

  private static final String CREATE_TABLE_STEPS_SUMMARY = "CREATE TABLE "
    + TABLE_STEPS_SUMMARY + "(" + ID + " INTEGER PRIMARY KEY AUTOINCREMENT,"
    + CREATION_DATE + " TEXT," + STEPS_COUNT + " INTEGER" + ")";

  StepsDBHelper(Context context) {
    super(context, DATABASE_NAME, null, DATABASE_VERSION);
  }

  @Override
  public void onCreate(SQLiteDatabase db) {
    db.execSQL(CREATE_TABLE_STEPS_SUMMARY);
  }

  @Override
  public void onUpgrade(SQLiteDatabase sqLiteDatabase, int i, int i1) {

  }

  @SuppressLint("Range")
  public boolean createStepsEntry() {
    boolean isDateAlreadyPresent = false;
    boolean createSuccessful = false;
    int currentDateStepCounts = 0;
    Calendar mCalendar = Calendar.getInstance();
    String todayDate =
      String.valueOf(mCalendar.get(Calendar.YEAR)) + "-" +
        String.valueOf(mCalendar.get(Calendar.MONTH) + 1) + "-" + String.valueOf(mCalendar.get(Calendar.DAY_OF_MONTH));

    if (mCalendar.get(Calendar.MONTH) < 9) {
      if (mCalendar.get(Calendar.DAY_OF_MONTH) < 10) {
        todayDate = String.valueOf(mCalendar.get(Calendar.YEAR)) + "-0" +
          String.valueOf(mCalendar.get(Calendar.MONTH) + 1) + "-0" + String.valueOf(mCalendar.get(Calendar.DAY_OF_MONTH));
      } else {
        todayDate = String.valueOf(mCalendar.get(Calendar.YEAR)) + "-0" +
          String.valueOf(mCalendar.get(Calendar.MONTH) + 1) + "-" + String.valueOf(mCalendar.get(Calendar.DAY_OF_MONTH));
      }
    } else {
      if (mCalendar.get(Calendar.DAY_OF_MONTH) < 10) {
        todayDate = String.valueOf(mCalendar.get(Calendar.YEAR)) + "-" +
          String.valueOf(mCalendar.get(Calendar.MONTH) + 1) + "-0" + String.valueOf(mCalendar.get(Calendar.DAY_OF_MONTH));
      }
    }


    String selectQuery = "SELECT " + STEPS_COUNT + " FROM " + TABLE_STEPS_SUMMARY + " WHERE " + CREATION_DATE +
      " = '" + todayDate + "' ";
    Log.d(TAG, "createStepsEntry: date is " + todayDate);
    try {
      SQLiteDatabase db = this.getReadableDatabase();
      Cursor c = db.rawQuery(selectQuery, null);
      if (c.moveToFirst()) {
        do {
          isDateAlreadyPresent = true;
          currentDateStepCounts = c.getInt((c.getColumnIndex(STEPS_COUNT)));
          Log.d(TAG, "createStepsEntry: current step before add " + currentDateStepCounts);
        } while (c.moveToNext());
      }
      db.close();
    } catch (Exception e) {
      e.printStackTrace();
    }

    try {
      Log.d(TAG, "createStepsEntry: start adding entry");
      SQLiteDatabase db = this.getWritableDatabase();
      ContentValues values = new ContentValues();
      values.put(CREATION_DATE, todayDate);
      if (isDateAlreadyPresent) {
        Log.d(TAG, "createStepsEntry: change value because entry is exist");
        values.put(STEPS_COUNT, ++currentDateStepCounts);
        int row = db.update(TABLE_STEPS_SUMMARY, values,
          CREATION_DATE + " = '" + todayDate + "'", null);
        if (row == 1) {
          createSuccessful = true;
        }
        db.close();
      } else {
        Log.d(TAG, "createStepsEntry: create new entry");
        values.put(STEPS_COUNT, 1);
        long row = db.insert(TABLE_STEPS_SUMMARY, null,
          values);
        if (row != -1) {
          createSuccessful = true;
        }
        db.close();
      }

    } catch (Exception e) {
      e.printStackTrace();
    }
    return createSuccessful;
  }

  @SuppressLint("Range")
  public ArrayList<DateStepsModel> readStepsEntries(ArrayList<DateStepsModel> oldVersion) {
    Calendar mCalendar = Calendar.getInstance();
    String todayDate =
      String.valueOf(mCalendar.get(Calendar.YEAR)) + "-" +
        String.valueOf(mCalendar.get(Calendar.MONTH) + 1) + "-" + String.valueOf(mCalendar.get(Calendar.DAY_OF_MONTH));

    if (mCalendar.get(Calendar.MONTH) < 9) {
      if (mCalendar.get(Calendar.DAY_OF_MONTH) < 10) {
        todayDate = String.valueOf(mCalendar.get(Calendar.YEAR)) + "-0" +
          String.valueOf(mCalendar.get(Calendar.MONTH) + 1) + "-0" + String.valueOf(mCalendar.get(Calendar.DAY_OF_MONTH));
      } else {
        todayDate = String.valueOf(mCalendar.get(Calendar.YEAR)) + "-0" +
          String.valueOf(mCalendar.get(Calendar.MONTH) + 1) + "-" + String.valueOf(mCalendar.get(Calendar.DAY_OF_MONTH));
      }
    } else {
      if (mCalendar.get(Calendar.DAY_OF_MONTH) < 10) {
        todayDate = String.valueOf(mCalendar.get(Calendar.YEAR)) + "-" +
          String.valueOf(mCalendar.get(Calendar.MONTH) + 1) + "-0" + String.valueOf(mCalendar.get(Calendar.DAY_OF_MONTH));
      }
    }

    Log.d(TAG, "readStepsEntries: today is " + todayDate);
    ArrayList<DateStepsModel> mStepCountList = new ArrayList<>();
    if (oldVersion != null)
      for (int i = 0; i < oldVersion.size(); i++) {
        mStepCountList.add(oldVersion.get(i));
      }
    String selectQuery = "SELECT * FROM " + TABLE_STEPS_SUMMARY;
    try {
      SQLiteDatabase db = this.getReadableDatabase();
      Cursor c = db.rawQuery(selectQuery, null);
      if (c.moveToFirst()) {
        do {
          Log.d(TAG, "readStepsEntries: date " + c.getString(c.getColumnIndex(CREATION_DATE)));
          if ((c.getString(c.getColumnIndex(CREATION_DATE))).equals(todayDate)) {
            Log.d(TAG, "readStepsEntries: update table");
            DateStepsModel mDateStepsModel = new DateStepsModel();
            mDateStepsModel.mDate = todayDate;
            mDateStepsModel.mStepCount = c.getInt((c.getColumnIndex(STEPS_COUNT)));
            mDateStepsModel.mUploaded = false;
            int index = -1;
            if (oldVersion != null)
              for (int i = 0; i < oldVersion.size(); i++) {
                if (oldVersion.get(i).mDate.equals(todayDate))
                  index = i;
              }
            if (index == -1) {
              mStepCountList.add(mDateStepsModel);
            } else if (oldVersion.get(index).mStepCount < mDateStepsModel.mStepCount) {
              mStepCountList.add(mDateStepsModel);
            }
          }

        } while (c.moveToNext());
      }
      db.close();
    } catch (Exception e) {
      e.printStackTrace();
    }
    return mStepCountList;
  }
}
