import { Component, OnInit } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventAddArg, EventApi, EventChangeArg, EventClickArg, EventRemoveArg } from '@fullcalendar/angular';
import { createEventId, INITIAL_EVENTS } from './event-utils';
import { ActivatedRoute } from '@angular/router';
import { iInstructor } from '../../model/instructor';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  currentEvents: EventApi[] = [];
  instructor: iInstructor;
  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    buttonText: {
      today: 'dzisiaj',
      month: 'miesiąc',
      week: 'tydzień',
      day: 'dzień',
      list: 'lista'
    },
    locale: 'pl',
    slotMinTime: '06:00:00',
    slotMaxTime: '21:00:00',
    height: 800,
    initialView: 'timeGridWeek',
    initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    // you can update a remote database when these fire:
    eventAdd: this.handleEventAdd.bind(this),
    eventChange: this.handleEventChange.bind(this),
    eventRemove: this.handleEventRemove.bind(this)
  };

  constructor(private activatedRoute: ActivatedRoute) {
  }

  calendarVisible = true;

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.instructor = data['instructor'];
    });
  }

  handleEventChange(eventChangeArg: EventChangeArg) {
    console.log("change");
    console.log(eventChangeArg);
  }

  handleEventRemove(eventRemoveArg: EventRemoveArg) {
    console.log("remove");
    console.log(eventRemoveArg);
  }

  handleEventAdd(eventAddArg: EventAddArg) {
    console.log(eventAddArg);
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    console.log(selectInfo);
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect(); // clear date selection
    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
      console.log(calendarApi);
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
    console.log(clickInfo);
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }
}
