import { Setter } from "solid-js";

export function tweenToNewViewBox(setViewBox: Setter<string>, currentViewBox: string, targetViewBox: string, duration = 200) {
    const startTime = performance.now();
    const current = currentViewBox.split(' ').map(Number);
    const target = targetViewBox.split(' ').map(Number);

    // Move the viewBox towards the target at the given speed
    function update(now: number) {
        const elapsedTime = now - startTime;
        const progress = Math.min(elapsedTime / duration, 1);

        const nextViewBox = current.map((start, index) => {
            const end = target[index];
            return start + (end - start) * progress; // Linear interpolation
        }).join(' ');

        setViewBox(nextViewBox);

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}
  