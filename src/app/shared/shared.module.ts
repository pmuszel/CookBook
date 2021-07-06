import { DropdownDirective } from './dropdown.directive';
import { PlaceholderDirevtive } from './placeholder/placeholder.directive';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { AlertComponent } from './alert/alert.component';
import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        AlertComponent,
        LoadingSpinnerComponent,
        PlaceholderDirevtive,
        DropdownDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        AlertComponent,
        LoadingSpinnerComponent,
        PlaceholderDirevtive,
        DropdownDirective,
        CommonModule
    ],
    entryComponents: [
      AlertComponent //Not needed in Angular9 og higher
    ]
})
export class SharedModule {}