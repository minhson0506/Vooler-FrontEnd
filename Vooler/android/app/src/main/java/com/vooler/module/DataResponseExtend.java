package com.vooler.module;

import com.google.gson.annotations.SerializedName;

public class DataResponseExtend extends DataResponse {
  @SerializedName("record_id")
  private int id;

  public DataResponseExtend(String status, String timeStamp, int uid, String data) {
    super(status, timeStamp, uid, data);
  }

}
