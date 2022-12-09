//
//  Pedometer.m
//  Vooler
//
//  Created by Dieu Vu on 11/27/22.
//

#import <Foundation/Foundation.h>
#import "React/RCTBridgeModule.h"
#import "React/RCTEventEmitter.h"

@interface RCT_EXTERN_MODULE(Pedometer, RCTEventEmitter);

RCT_EXTERN_METHOD(getToken:(NSString *)token)
RCT_EXTERN_METHOD(runPedometerBackgroundTasks:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)

@end

