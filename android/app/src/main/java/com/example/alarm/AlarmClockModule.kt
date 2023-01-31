package com.example.alarm

import android.app.AlarmManager
import android.app.PendingIntent
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.os.Build
import android.os.SystemClock
import android.provider.AlarmClock
import android.util.Log
import android.widget.Toast
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import java.text.DateFormat
import java.text.SimpleDateFormat
import java.util.*
import kotlin.coroutines.coroutineContext

private const val TAG = "[RNAlarmClock]"
private const val requestId = 0

class AlarmClockModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {
    override fun getName() = "AlarmClock"

    @ReactMethod
    fun createAlarm(isoDate: String, name: String) {
        try {
            val calendar: Calendar = Calendar.getInstance()
//            val calSet = calendar.clone() as Calendar;
//            Log.d(TAG, "createAlarm: ${calendar.get(Calendar.YEAR)}")
//            calSet.apply {
//                set(Calendar.YEAR, calendar.get(Calendar.YEAR))
//                set(Calendar.MONTH, calendar.get(Calendar.MONTH))
//                set(Calendar.DAY_OF_MONTH, calendar.get(Calendar.DAY_OF_MONTH))
//                set(Calendar.HOUR, calendar.get(Calendar.HOUR))
//                set(Calendar.MINUTE, calendar.get(Calendar.MINUTE))
//                set(Calendar.SECOND, calendar.get(Calendar.SECOND + 10))
//            }

//            val calendar: Calendar = getTargetTime(isoDate)
            setAlarm(0)
//            Log.d(TAG, "createAlarm: ${calendar.timeInMillis}")
//            Log.d(TAG, "createAlarm: ${calendar.get(Calendar.MILLISECOND)}")
//            Log.d(TAG, "createAlarm: ${isoDate}")
//
//            Log.d(TAG, "createAlarm: ${calendar.timeInMillis}")

            val intent = Intent(AlarmClock.ACTION_SET_ALARM).apply {
                putExtra(AlarmClock.EXTRA_SKIP_UI, true)
                putExtra(AlarmClock.EXTRA_MESSAGE, name)
                putExtra(AlarmClock.EXTRA_HOUR, calendar.get(Calendar.HOUR))
                putExtra(AlarmClock.EXTRA_MINUTES, calendar.get(Calendar.MINUTE))
            }

//            val alarmManager = reactApplicationContext.getSystemService(Context.ALARM_SERVICE) as AlarmManager


//            currentActivity?.startActivity(intent)
        } catch (e: Exception) {
            e.printStackTrace()
            Log.e(TAG, "Error creating reminder", e)
            return
        }

        Log.i(TAG, "Reminder created")
    }

    private fun setAlarm(timeInMillis: Long) {
        val alarmManager =
            reactApplicationContext.getSystemService(Context.ALARM_SERVICE) as AlarmManager
        val alarmIntent = Intent(currentActivity, MyAlarm::class.java).let { intent ->
            PendingIntent.getBroadcast(currentActivity, 0, intent, 0)
        }
        val calendar = Calendar.getInstance()
        calendar.timeInMillis = System.currentTimeMillis()

        Log.d(TAG, "setAlarm: ${calendar.timeInMillis}")
        alarmManager?.setRepeating(
            AlarmManager.RTC_WAKEUP,
//            SystemClock.elapsedRealtime() + 60 * 1000,
//            SystemClock.currentThreadTimeMillis() + 60 * 1000,
            calendar.timeInMillis + 60 * 1000,
            1000 * 60 * 10,
            alarmIntent
        )
        Toast.makeText(currentActivity, "Alarm is set", Toast.LENGTH_SHORT).show()
    }

//    private fun getTargetTime(isoDate: String): Calendar {
//        val tz = TimeZone.getTimeZone("UTC")
//        val df1: DateFormat = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
//        df1.timeZone = tz;
//        val date: Date = df1.parse(isoDate)
//
//        val calNow = Calendar.getInstance();
//        val calSet = calNow.clone() as Calendar;
//        calSet.set(Calendar.DAY_OF_MONTH, date.date);
//        calSet.set(Calendar.HOUR_OF_DAY, date.hours);
//        calSet.set(Calendar.MINUTE, date.minutes);
//        calSet.set(Calendar.SECOND, date.seconds);
//        calSet.set(Calendar.MILLISECOND, 0);
//
//        return calSet
//    }

    private class MyAlarm : BroadcastReceiver() {
        override fun onReceive(
            context: Context,
            intent: Intent
        ) {
            Log.d(TAG, "Alarm just fired")
        }
    }
}

