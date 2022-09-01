import { Component } from '@angular/core';

export interface Pizza {
    diameter: number;
    price: number;
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    allPizzas: Pizza[] = [{ diameter: 0, price: 0 }];
    bestIndex = -1;

    hasWarnings: boolean = false;
    warnings: { [key: number]: boolean } = {};

    addPizza(): void {
        this.reset();
        this.allPizzas.push({ diameter: 0, price: 0 });
    }

    calculateValue(): void {
        this.reset();

        let bestIndexSoFar = 0;
        let bestValueSoFar = 0;

        this.allPizzas.forEach((pizza: Pizza, index: number) => {
            if (isNaN(pizza.diameter) || isNaN(pizza.price)) {
                this.hasWarnings = true;
                this.warnings[index] = true;
            } else {
                const calculatedValue = Math.pow(pizza.diameter / 2,2) * Math.PI / pizza.price;

                if (calculatedValue > bestValueSoFar) {
                    bestValueSoFar = calculatedValue;
                    bestIndexSoFar = index;
                }
            }
        });

        if (!this.hasWarnings) {
            this.bestIndex = bestIndexSoFar;
        }
    }

    removePizza(index: number): void {
        this.allPizzas.splice(index, 1);
    }

    reset(): void {
        this.bestIndex = -1;
        this.hasWarnings = false;
        this.warnings = {};
    }
}
