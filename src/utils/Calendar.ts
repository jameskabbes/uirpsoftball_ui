function createCalendar(events: string[]): string {
  const calendar = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//uirp//softball//EN
${events.join('\n')}
END:VCALENDAR`;
  return calendar;
}

function downloadCalendar(icsContent: string) {
  const blob = new Blob([icsContent], { type: 'text/calendar' });
  const url = URL.createObjectURL(blob);

  // Create a link and trigger the download
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'events.ics');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export { createCalendar, downloadCalendar };
