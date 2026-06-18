/**
 * classes.data.js
 * ------------------------------------------------------------------
 * TEMPORARY DATA SOURCE — plays the role of a "classes" table.
 *
 * `enrolledUserIds` plays the role of a join table (e.g. a real DB
 * would have a separate "bookings" table linking users <-> classes).
 * It's kept simple here on purpose; see class.repository.js for the
 * functions that read/write it.
 * ------------------------------------------------------------------
 */

const classes = [
  {
    id: 1,
    name: 'Beginner Mat Pilates',
    instructor: 'Jenny Tran',
    day: 'Mon & Wed',
    time: '07:00 - 08:00',
    level: 'Beginner',
    capacity: 12,
    enrolledUserIds: [],
  },
  {
    id: 2,
    name: 'Reformer Pilates Flow',
    instructor: 'Mark Nguyen',
    day: 'Tue & Thu',
    time: '18:00 - 19:00',
    level: 'Intermediate',
    capacity: 8,
    enrolledUserIds: [],
  },
  {
    id: 3,
    name: 'Advanced Power Pilates',
    instructor: 'Linh Pham',
    day: 'Friday',
    time: '17:30 - 18:45',
    level: 'Advanced',
    capacity: 10,
    enrolledUserIds: [],
  },
  {
    id: 4,
    name: 'Prenatal Pilates',
    instructor: 'Hoa Le',
    day: 'Saturday',
    time: '09:00 - 10:00',
    level: 'All levels',
    capacity: 10,
    enrolledUserIds: [],
  },
];

module.exports = classes;
