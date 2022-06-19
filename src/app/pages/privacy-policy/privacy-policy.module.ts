import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { PrivacyPolicyComponent } from './privacy-policy.component';
import { PrivacyPolicyRoutingModule } from './privacy-policy-routing.module';


@NgModule({
    declarations: [
        PrivacyPolicyComponent
    ],
    imports: [
        CommonModule,
        PrivacyPolicyRoutingModule,
        SharedModule
    ]
})
export class PrivacyPolicyModule { }
