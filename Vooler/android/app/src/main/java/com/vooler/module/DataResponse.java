package com.vooler.module;

import com.google.gson.annotations.SerializedName;

public class DataResponse {
  private String status;
  @SerializedName("saved_timestamp")
  private String timeStamp;
  private int uid;
  @SerializedName("record_date")
  private String data;

  public DataResponse(String status, String timeStamp, int uid, String data) {
    this.status = status;
    this.timeStamp = timeStamp;
    this.uid = uid;
    this.data = data;
  }

  @Override
  public String toString() {
    return "DataResponse{" +
      "status='" + status + '\'' +
      ", timeStamp='" + timeStamp + '\'' +
      ", uid=" + uid +
      ", data='" + data + '\'' +
      '}';
  }
}
