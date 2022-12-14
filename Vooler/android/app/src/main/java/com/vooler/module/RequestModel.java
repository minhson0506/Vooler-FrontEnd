package com.vooler.module;


public class RequestModel {
  private int stepCount;
  private String recordDate;

  public RequestModel(int stepCount, String recordDate) {
    this.stepCount = stepCount;
    this.recordDate = recordDate;
  }

  @Override
  public String toString() {
    return "DataModel{" +
      "stepCount=" + stepCount +
      ", recordDate='" + recordDate + '\'' +
      '}';
  }
}
