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

RCT_EXTERN_METHOD(test:(RCTResponseSenderBlock)callback)
RCT_EXTERN_METHOD(getSteps:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)

@end

