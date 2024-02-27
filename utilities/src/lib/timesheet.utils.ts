import { MomentInput, Time } from '@webui/time';

type TimesheetTimeProperty =
  | 'shift_ended_at'
  | 'shift_started_at'
  | 'break_ended_at'
  | 'break_started_at';

export function getTotalTime(
  data: Record<TimesheetTimeProperty, MomentInput>,
  timezone?: string
) {
  const shift_ended_at = Time.parse(data.shift_ended_at, { timezone });
  const shift_started_at = Time.parse(data.shift_started_at, { timezone });

  let breakTime = 0;

  if (!data.shift_ended_at) {
    return '0hr 0min';
  }

  if (shift_ended_at.isBefore(shift_started_at)) {
    return '0hr 0min';
  }

  if (data.break_ended_at && data.break_started_at) {
    const break_ended_at = Time.parse(data.break_ended_at, { timezone });
    const break_started_at = Time.parse(data.break_started_at, { timezone });

    if (
      break_started_at.isAfter(shift_ended_at) ||
      break_ended_at.isAfter(shift_ended_at) ||
      break_started_at.isBefore(shift_started_at) ||
      break_ended_at.isBefore(shift_started_at)
    ) {
      return '0hr 0min';
    }

    breakTime = break_ended_at.diff(break_started_at);
  }

  const workTime = shift_ended_at.diff(shift_started_at);
  const totalTime = Time.duration(workTime - breakTime);

  return `${Math.floor(totalTime.asHours())}hr ${totalTime.minutes()}min`;
}
