import {NativeModules, Platform, processColor} from 'react-native';
import {
  CalendarOptions,
  CalendarEventReadable,
  Calendar,
  AuthorizationStatus,
  ISODateString,
  Options,
  CalendarEventWritable,
} from './RNCalendarEventsTypes';

const RNCalendarEvents = NativeModules.RNCalendarEventsO2;

class ReactNativeCalendarEvents {
  /**
   * Get calendar authorization status.
   * @param readOnly - optional, default false, use true to check for calendar read-only vs calendar read/write. Android-specific, iOS is always read/write
   */
  static checkPermissions(
    readOnly: boolean = false,
  ): Promise<AuthorizationStatus> {
    // readOnly is ignored on iOS, the platform does not support it.
    if (Platform.OS === 'ios') {
      RNCalendarEvents.checkPermissions();
    }
    return RNCalendarEvents.checkPermissions(readOnly);
  }
  /**
   * Request calendar authorization. Authorization must be granted before accessing calendar events.
   * @param readOnly - optional, default false, use true to request for calendar read-only vs calendar read/write. Android-specific, iOS is always read/write
   */
  static requestPermissions(
    readOnly: boolean = false,
  ): Promise<AuthorizationStatus> {
    // readOnly is ignored on iOS, the platform does not support it.
    if (Platform.OS === 'ios') {
      RNCalendarEvents.requestPermissions();
    }
    return RNCalendarEvents.requestPermissions(readOnly);
  }
  /**
   * Fetch all calendar events.
   * @param startDate - Date string in ISO format
   * @param endDate - Date string in ISO format
   * @param [calendarIds] - List of calendar id strings to specify calendar events. Defaults to all calendars if empty.
   */
  static fetchAllEvents(
    startDate: ISODateString,
    endDate: ISODateString,
    calendars: string[] = [],
  ): Promise<CalendarEventReadable[]> {
    return RNCalendarEvents.findAllEvents(startDate, endDate, calendars);
  }
  /** Finds all the calendars on the device. */
  static findCalendars(): Promise<Calendar[]> {
    return RNCalendarEvents.findCalendars();
  }
  /** Create a calendar.
   * @param calendar - Calendar to create
   */
  static saveCalendar(options: CalendarOptions): Promise<string> {
    return RNCalendarEvents.saveCalendar({
      ...options,
      color: options.color ? processColor(options.color) : undefined,
    });
  }
  /**
   * Removes a calendar.
   * @param id - The calendar id
   * @returns - Promise resolving to boolean to indicate if removal succeeded.
   */
  static removeCalendar(id: string): Promise<boolean> {
    return RNCalendarEvents.removeCalendar(id);
  }
  /**
   * Find calendar  by id.
   * @param id - Calendar ID
   */
  static findEventById(id: string): Promise<CalendarEventReadable | null> {
    return RNCalendarEvents.findById(id);
  }
  /**
   * Creates or updates a calendar event. To update an event, the event id must be defined.
   * @param title - The title of the event
   * @param details - Event details
   * @param [options] - Options specific to the saved event.
   * @returns - Promise resolving to saved event's ID.
   */
  static saveEvent(
    title: string,
    details: CalendarEventWritable,
    options: Options | {sync: boolean} = {sync: false},
  ) {
    return RNCalendarEvents.saveEvent(title, details, options);
  }
  /**
   * Removes calendar event.
   * @param id - The event id
   * @param [options] - Options specific to the saved event.
   * @returns - Promise resolving to boolean to indicate if removal succeeded.
   */
  static removeEvent(
    id: string,
    options: Options | {sync: boolean} = {sync: false},
  ) {
    return RNCalendarEvents.removeEvent(id, options);
  }

  static uriForCalendar() {
    return RNCalendarEvents.uriForCalendar();
  }

  static openEventInCalendar(eventID: number) {
    RNCalendarEvents.openEventInCalendar(eventID);
  }
}

export default ReactNativeCalendarEvents;
