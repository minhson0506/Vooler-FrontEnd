package com.vooler.module;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.Header;
import retrofit2.http.POST;

public interface RetrofitAPI {
  @POST("record")
  Call<DataResponse> createPost(@Header("Authorization") String token, @Body DataModel dataModel);
}
