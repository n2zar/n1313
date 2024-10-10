// حساب المدة بين تاريخ الانفكاك وتاريخ انتهاء الإجازة
document.getElementById('calculateButton').addEventListener('click', function() {
    let dateOfEntitlement = new Date(document.getElementById('textbox1').value);
    let endOfLeave = new Date(document.getElementById('textbox2').value);
    let startOfResumption = new Date(document.getElementById('textbox3').value);
    let additionalDays = document.getElementById('textbox11').value;
    let messageDuration = document.getElementById('message-duration');
    let resultTextBox4 = document.getElementById('resultTextBox4'); // المدة الكلية
    let resultTextBox5 = document.getElementById('resultTextBox5'); // المدة المستقطعة
    let resultTextBox6 = document.getElementById('resultTextBox6'); // المدة المتبقية

    // إعادة تعيين الرسائل والنتائج السابقة
    messageDuration.innerText = '';
    resultTextBox4.innerText = '';
    resultTextBox5.innerText = '';
    resultTextBox6.innerText = '';

    // التحقق من صحة التواريخ
    if (!dateOfEntitlement) {
        messageDuration.innerText = 'يرجى إدخال تاريخ الانفكاك.';
        return;
    }

    // التحقق مما إذا كانت أحد الراديو بوتنز محددة
    let selectedRadio = document.querySelector('input[name="duration"]:checked');
    if (selectedRadio) {
        let value = parseInt(selectedRadio.value); // القيمة المأخوذة من الراديو بوتن (عدد الأيام أو الأشهر أو السنوات)

        // إضافة القيمة المختارة إلى التاريخ (15 يومًا، 1 شهر، 6 أشهر، سنة)
        if (value === 15) {
            dateOfEntitlement.setDate(dateOfEntitlement.getDate() + 15);
        } else if (value === 30) {
            dateOfEntitlement.setMonth(dateOfEntitlement.getMonth() + 1);
        } else if (value === 180) {
            dateOfEntitlement.setMonth(dateOfEntitlement.getMonth() + 6);
        } else if (value === 365) {
            dateOfEntitlement.setFullYear(dateOfEntitlement.getFullYear() + 1);
        }

        // تحديث "تكست بوكس 2" مع التاريخ الجديد
        document.getElementById('textbox2').value = dateOfEntitlement.toISOString().split('T')[0];
        endOfLeave = dateOfEntitlement; // تعيين نهاية الإجازة بناءً على الراديو بوتنز
    }

    // إذا تم إدخال عدد الأيام الإضافية، يتم تعديل تاريخ نهاية الإجازة
    if (additionalDays && !isNaN(additionalDays)) {
        let adjustedEndDate = new Date(document.getElementById('textbox1').value);
        adjustedEndDate.setDate(adjustedEndDate.getDate() + parseInt(additionalDays));
        document.getElementById('textbox2').value = adjustedEndDate.toISOString().split('T')[0];
        endOfLeave = adjustedEndDate; // تعيين نهاية الإجازة بناءً على عدد الأيام
    } else if (additionalDays && isNaN(additionalDays)) {
        messageDuration.innerText = 'يرجى إدخال رقم صحيح للأيام الإضافية.';
        return;
    }

    // حساب الفرق بين التواريخ
    if (endOfLeave) {
        let totalDuration = calculateDateDifference(new Date(document.getElementById('textbox1').value), endOfLeave);
        resultTextBox4.innerText = totalDuration;

        if (startOfResumption) {
            if (startOfResumption <= new Date(document.getElementById('textbox1').value) || startOfResumption >= endOfLeave) {
                message
                messageDuration.innerText = 'يجب أن يكون تاريخ المباشرة أكبر من تاريخ الانفكاك وأقل من تاريخ نهاية الإجازة.';
                return;
            }
            let deductedDuration = calculateDateDifference(new Date(document.getElementById('textbox1').value), startOfResumption);
            resultTextBox5.innerText = deductedDuration;

            let finalDuration = calculateDateDifference(startOfResumption, endOfLeave);
            resultTextBox6.innerText = finalDuration;
        }
    }
});

// دالة لحساب الفرق بين التواريخ
function calculateDateDifference(startDate, endDate) {
    let yearsDifference = endDate.getFullYear() - startDate.getFullYear();
    let monthsDifference = endDate.getMonth() - startDate.getMonth();
    let daysDifference = endDate.getDate() - startDate.getDate();

    if (daysDifference < 0) {
        monthsDifference--;
        daysDifference += new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0).getDate();
    }

    if (monthsDifference < 0) {
        yearsDifference--;
        monthsDifference += 12;
    }

    return `${yearsDifference} سنة ${monthsDifference} شهر ${daysDifference} يوم`;
}

// حساب 51 يوم
document.getElementById('calculate51Button').addEventListener('click', function() {
    let date51 = new Date(document.getElementById('textbox7').value);
    let message51days = document.getElementById('message-51days');
    let result51days = document.getElementById('result51days');

    // إعادة تعيين الرسائل السابقة
    message51days.innerText = '';
    result51days.innerText = '';

    if (!date51) {
        message51days.innerText = 'يرجى إدخال تاريخ بداية.';
        return;
    }

    // حساب تاريخ النهاية بعد 51 يومًا
    let newDate51 = new Date(date51);
    newDate51.setDate(newDate51.getDate() + 51);
    result51days.innerText = newDate51.toISOString().split('T')[0];
});

// حساب الرصيد
document.getElementById('calculateBalanceButton').addEventListener('click', function() {
    let hireDate = new Date(document.getElementById('textbox8').value);
    let currentDate = new Date(document.getElementById('textbox9').value);
    let usedLeave = document.getElementById('textbox10').value;
    let label12 = document.getElementById('label12');
    let label13 = document.getElementById('label13');
    let messageBalance = document.getElementById('message-balance');

    // إعادة تعيين الرسائل والنتائج السابقة
    label12.innerText = '';
    label13.innerText = '';
    messageBalance.innerText = '';

    // التحقق من صحة المدخلات
    if (!hireDate || !currentDate) {
        messageBalance.innerText = 'يرجى إدخال تاريخ التعيين والتاريخ الحالي.';
        return;
    }

    if (hireDate > currentDate) {
        messageBalance.innerText = 'يجب أن يكون التاريخ الحالي أكبر من أو يساوي تاريخ التعيين.';
        return;
    }

    if (usedLeave && isNaN(usedLeave)) {
        messageBalance.innerText = 'يرجى إدخال عدد الإجازات المستخدمة بشكل صحيح.';
        return;
    }

    // حساب المدة بين تاريخ التعيين والتاريخ الحالي
    let totalDays = calculateDateDifferenceInDays(hireDate, currentDate);
    let yearsDifference = currentDate.getFullYear() - hireDate.getFullYear();
    let monthsDifference = currentDate.getMonth() - hireDate.getMonth();
    let daysDifference = currentDate.getDate() - hireDate.getDate();

    if (daysDifference < 0) {
        monthsDifference--;
        daysDifference += new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
    }

    if (monthsDifference < 0) {
        yearsDifference--;
        monthsDifference += 12;
    }

    // حساب الرصيد المتاح بناءً على عدد الأيام
    let yearsInDays = yearsDifference * 36;
    let monthsInDays = monthsDifference * 3;
    let daysInDays = Math.floor(daysDifference / 10); // يتم حساب يوم واحد لكل 10 أيام

    let totalDaysAvailable = yearsInDays + monthsInDays + daysInDays - (usedLeave ? parseInt(usedLeave) : 0);

    // عرض النتائج
    label12.innerText = totalDaysAvailable.toString();
    label13.innerText = `${yearsDifference} سنة ${monthsDifference} شهر ${daysDifference} يوم`;
});

// حساب الفرق بين التواريخ بالأيام (رقم الأيام)
function calculateDateDifferenceInDays(startDate, endDate) {
    return Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));
}

// زر إعادة تعيين
document.getElementById('resetButton').addEventListener('click', function() {
    // مسح جميع القيم
    document.getElementById('textbox1').value = '';
    document.getElementById('textbox2').value = '';
    document.getElementById('textbox3').value = '';
    document.getElementById('textbox7').value = '';
    document.getElementById('textbox8').value = '';
    document.getElementById('textbox9').value = '';
    document.getElementById('textbox10').value = '';
    document.getElementById('textbox11').value = '';

    // مسح النتائج
    document.getElementById('resultTextBox4').innerText = '';
    document.getElementById('resultTextBox5').innerText = '';
    document.getElementById('resultTextBox6').innerText = '';
    document.getElementById('result51days').innerText = '';
    document.getElementById('label12').innerText = '';
    document.getElementById('label13').innerText = '';
    document.getElementById('message-duration').innerText = '';
    document.getElementById('message-51days').innerText = '';
    document.getElementById('message-balance').innerText = '';

    // إعادة تعيين الراديو بوتنز
    document.querySelectorAll('input[name="duration"]').forEach(function(radio) {
        radio.checked = false;
    });
});
