document.addEventListener('DOMContentLoaded', () => {
    const weightInput = document.getElementById('weight');
    const weightUnit = document.getElementById('weightUnit');
    const heightUnit = document.getElementById('heightUnit');
    const metricHeight = document.getElementById('metricHeight');
    const imperialHeight = document.getElementById('imperialHeight');
    const calculateBtn = document.getElementById('calculateBtn');
    const bmiValue = document.getElementById('bmiValue');
    const bmiCategory = document.getElementById('bmiCategory');
    const errorDiv = document.getElementById('error');

    // Toggle between metric and imperial height inputs
    heightUnit.addEventListener('change', () => {
        if (heightUnit.value === 'm') {
            metricHeight.style.display = 'block';
            imperialHeight.style.display = 'none';
        } else {
            metricHeight.style.display = 'none';
            imperialHeight.style.display = 'block';
        }
    });

    // Calculate BMI
    calculateBtn.addEventListener('click', () => {
        // Clear previous errors
        errorDiv.style.display = 'none';
        errorDiv.textContent = '';

        try {
            // Get weight
            const weight = parseFloat(weightInput.value);
            if (isNaN(weight) || weight <= 0) {
                throw new Error('Please enter a valid positive weight.');
            }

            // Get height based on selected unit
            let height;
            if (heightUnit.value === 'm') {
                height = parseFloat(document.getElementById('heightM').value);
                if (isNaN(height) || height <= 0) {
                    throw new Error('Please enter a valid positive height in meters.');
                }
            } else {
                const feet = parseFloat(document.getElementById('heightFt').value);
                const inches = parseFloat(document.getElementById('heightIn').value);
                
                if (isNaN(feet) || isNaN(inches) || feet < 0 || inches < 0 || inches >= 12) {
                    throw new Error('Please enter valid height in feet and inches.');
                }
                height = (feet * 12 + inches) * 0.0254; // Convert to meters
            }

            // Calculate BMI
            let bmi;
            if (weightUnit.value === 'kg') {
                bmi = weight / (height * height);
            } else {
                // Convert pounds to kg
                const weightKg = weight * 0.453592;
                bmi = weightKg / (height * height);
            }

            // Round to one decimal place
            bmi = Math.round(bmi * 10) / 10;

            // Determine category
            let category;
            if (bmi < 18.5) {
                category = 'Underweight';
            } else if (bmi < 25) {
                category = 'Normal Weight';
            } else if (bmi < 30) {
                category = 'Overweight';
            } else {
                category = 'Obese';
            }

            // Display results
            bmiValue.textContent = bmi;
            bmiCategory.textContent = category;

        } catch (error) {
            errorDiv.textContent = error.message;
            errorDiv.style.display = 'block';
            bmiValue.textContent = '-';
            bmiCategory.textContent = '-';
        }
    });
}); 