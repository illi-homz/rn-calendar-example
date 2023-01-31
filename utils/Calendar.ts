import RNCalendarEvents, {
  Calendar as CalendarNative,
  CalendarOptions,
} from 'react-native-calendar-events';

const costomCalendar: CalendarOptions = {
  title: 'gopkabel@gmail.com',
  color: '#FF0000',
  entityType: 'event',
  name: 'string',
  accessLevel: 'owner',
  ownerAccount: 'gopkabel@gmail.com',
  source: {
    name: 'Ilya',
    type: 'com.example',
    // isLocalAccount: true,
  },
};

class Calendar {
  private calendar?: CalendarNative;

  constructor() {
    this.onStart();
  }

  async onStart() {
    const grant = await this.checkPermission();
    if (!grant) {
      return this.requestPermission();
    }

    const calendar = await this.findCalendars();
    if (calendar) {
      this.calendar = calendar;
      // calendar?.id && this.removeCalendar(calendar.id);
    } else {
      this.createCalendar();
    }
  }

  async checkPermission() {
    const res = await RNCalendarEvents.checkPermissions(false);
    if (['undetermined', 'denied', 'restricted'].includes(res)) {
      return false;
    }

    console.log('Calendar is granted', res);
    return true;
  }
  async requestPermission() {
    const res = await RNCalendarEvents.requestPermissions(false);
    if (res === 'authorized') {
      this.onStart();
    }
    console.log('requestPermission', res);
  }

  async createCalendar() {
    const calendarId = await RNCalendarEvents.saveCalendar(costomCalendar);
    this.findCalendars();
    console.log('Calendar is created by id', calendarId);
  }

  async removeCalendar(id: string) {
    const res = await RNCalendarEvents.removeCalendar(id);
    this.calendar = undefined;
    console.log('Calendar removed', res);
  }

  addEvent(startDate: Date) {
    console.log('this.calendar', this.calendar);
    if (!this.calendar) return;

    console.log('startDate', startDate.toISOString());

    const endDate = new Date(startDate.getTime() + 60 * 1000).toISOString();

    RNCalendarEvents.saveEvent('Calendar title', {
      calendarId: this.calendar.id,
      calendar: this.calendar,
      startDate: startDate.toISOString(),
      endDate,
      description: 'description',
      location: 'Cherepovets',
      url: 'https://example.ru',
      isDetached: false,
      alarms: [{date: 1}],
      attendees: [
        {
          email: 'ilya_gomza@bk.ru',
          name: 'Ilya',
          url: 'ilya_gomza@bk.ru',
          firstName: 'Ilya',
        },
      ],
    });
  }

  getEvents() {}

  async findCalendars(): Promise<CalendarNative | undefined> {
    const calendars = await RNCalendarEvents.findCalendars();
    console.log('calendars', calendars);
    const calendar = calendars?.find(el => el.title === costomCalendar.title);
    return calendar;
  }
}

export default new Calendar();
export {Calendar};