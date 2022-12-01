package com.vooler.module;

public class DateStepsModel {
  public String mDate;
  public int mStepCount;
  public boolean mUploaded;

  @Override
  public String toString() {
    return "DateStepsModel{" +
      "mDate='" + mDate + '\'' +
      ", mStepCount=" + mStepCount +
      ", mUploaded=" + mUploaded +
      '}';
  }
}
