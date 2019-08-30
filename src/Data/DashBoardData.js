export const DashBoardData = [{
    id: 1,
    room: 'B1',
    classCapacity: 10,
    teacher: 'Dr. Mina l zaber',
    çourse: 'Java 3',
    nbrStudents: 10,
    date: new Date('2019-11-04'),//YYYY-MM-DD
    startTime: new Date('2019-11-04 03:00 PM'),
    endTime: new Date('2019-11-04 05:00 PM'),
    floor: '1',
    status: 'live'
},
{
    id: 2,
    room: 'B2',
    classCapacity: 20,
    teacher: 'Dr. Rabih',
    çourse: 'Data base',
    nbrStudents: 15,
    date: new Date('2019-10-01'),//YYYY-MM-DD
    startTime: new Date('2019-10-01 03:00 PM'),
    endTime: new Date('2019-10-01 04:45 PM'),
    floor: '2',
    status: 'live'
},
{
    id: 3,
    room: 'B3',
    classCapacity: 30,
    teacher: 'Dr. Chady',
    çourse: 'Programmation Avance',
    nbrStudents: 20,
    date: new Date('2019-10-01'),//YYYY-MM-DD
    startTime: new Date('2019-10-01 05:00 PM'),
    endTime: new Date('2019-10-01 06:45 PM'),
    floor: '3',
    status: 'live'
},
{
    id: 4,
    room: 'B4',
    classCapacity: 40,
    teacher: 'Dr. Bilal',
    çourse: 'Reseaux',
    nbrStudents: 35,
    date: new Date('2019-10-02'),//YYYY-MM-DD
    startTime: new Date('2019-10-02 03:00 PM'),
    endTime: new Date('2019-10-02 05:00 PM'),
    floor: '4',
    status: 'cancelled'
},

{
    id: 5,
    room: 'B5',
    classCapacity: 40,
    teacher: 'Dr. Bilal',
    çourse: 'Reseaux',
    nbrStudents: 35,
    date: new Date('2019-10-02'),//YYYY-MM-DD
    startTime: new Date('2019-10-02 03:00 PM'),
    endTime: new Date('2019-10-02 05:00 PM'),
    floor: '4',
    status: 'live'
},
{
    id: 6,
    room: 'B1',
    classCapacity: 40,
    teacher: 'Dr. Fady Moukawam',
    çourse: 'Arabe',
    nbrStudents: 10,
    date: new Date('2019-11-04'),//YYYY-MM-DD
    startTime: new Date('2019-10-02 05:15 PM'),
    endTime: new Date('2019-10-02 07:00 PM'),
    floor: '1',
    status: 'upcoming'
},
{
    id: 7,
    room: 'C2',
    classCapacity: 20,
    teacher: null,
    çourse: null,
    nbrStudents: null,
    date: null,
    startTime: null,
    endTime: null,
    floor: '2',
    status: 'vacant'
},
{
    id: 8,
    room: 'A2',
    classCapacity: 20,
    teacher: null,
    çourse: null,
    nbrStudents: null,
    date: null,
    startTime: null,
    endTime: null,
    floor: '1',
    status: 'vacant'
},
{
    id: 9,
    room: 'E3',
    classCapacity: 20,
    teacher: null,
    çourse: null,
    nbrStudents: null,
    date: null,
    startTime: null,
    endTime: null,
    floor: '3',
    status: 'vacant'
},
{
    id: 10,
    room: 'B2',
    classCapacity: 20,
    teacher: 'Dr. Omar',
    çourse: 'Structure',
    nbrStudents: 11,
    date: new Date('2019-10-12'),//YYYY-MM-DD
    startTime: new Date('2019-10-01 03:00 PM'),
    endTime: new Date('2019-10-01 04:45 PM'),
    floor: '1',
    status: 'live'
},
{
    id: 11,
    room: 'B2',
    classCapacity: 20,
    teacher: 'Dr. Rashid Aoun',
    çourse: 'Operating System',
    nbrStudents: 5,
    date: new Date('2019-10-11'),//YYYY-MM-DD
    startTime: new Date('2019-10-01 01:00 PM'),
    endTime: new Date('2019-10-01 02:00 PM'),
    floor: '1',
    status: 'cancelled'
},
{
    id: 12,
    room: 'B2',
    classCapacity: 20,
    teacher: 'Dr. Rosario Issa',
    çourse: 'Base De Donne',
    nbrStudents: 40,
    date: new Date('2019-10-09'),//YYYY-MM-DD
    startTime: new Date('2019-10-01 05:00 PM'),
    endTime: new Date('2019-10-01 07:45 PM'),
    floor: '2',
    status: 'upcoming'
},
{
    id: 13,
    room: 'B2',
    classCapacity: 20,
    teacher: 'Dr. Rabih',
    çourse: 'Data base',
    nbrStudents: 15,
    date: new Date('2019-10-07'),//YYYY-MM-DD
    startTime: new Date('2019-10-01 12:00 PM'),
    endTime: new Date('2019-10-01 02:45 PM'),
    floor: '2',
    status: 'cancelled'
},
];

export const roomName = [
    { label: 'A1', value: 'A1', floor: 1 },
    { label: 'B1', value: 'B1', floor: 1 },
    { label: 'C1', value: 'C1', floor: 1 },
    { label: 'D1', value: 'D1', floor: 1 },
    { label: 'E1', value: 'E1', floor: 1 },
    { label: 'F1', value: 'F1', floor: 1 },
    { label: 'G1', value: 'G1', floor: 1 },
    { label: 'H1', value: 'H1', floor: 1 },

    { label: 'A2', value: 'A2', floor: 2 },
    { label: 'B2', value: 'B2', floor: 2 },
    { label: 'C2', value: 'C2', floor: 2 },
    { label: 'D2', value: 'D2', floor: 2 },
    { label: 'E2', value: 'E2', floor: 2 },
    { label: 'F2', value: 'F2', floor: 2 },
    { label: 'G2', value: 'G2', floor: 2 },
    { label: 'H2', value: 'H2', floor: 2 },

    { label: 'A3', value: 'A3', floor: 3 },
    { label: 'B3', value: 'B3', floor: 3 },
    { label: 'C3', value: 'C3', floor: 3 },
    { label: 'D3', value: 'D3', floor: 3 },
    { label: 'E3', value: 'E3', floor: 3 },
    { label: 'F3', value: 'F3', floor: 3 },
    { label: 'G3', value: 'G3', floor: 3 },
    { label: 'H3', value: 'H3', floor: 3 },

    { label: 'A4', value: 'A4', floor: 4 },
    { label: 'B4', value: 'B4', floor: 4 },
    { label: 'C4', value: 'C4', floor: 4 },
    { label: 'D4', value: 'D4', floor: 4 },
    { label: 'E4', value: 'E4', floor: 4 },
    { label: 'F4', value: 'F4', floor: 4 },
    { label: 'G4', value: 'G4', floor: 4 },
    { label: 'H4', value: 'H4', floor: 4 },

]

export const roomStatus = [
    { label: 'Vacant', value: 'vacant' },
    { label: 'Live', value: 'live' },
    { label: 'Cancelled', value: 'cancelled' },
    { label: 'Up Coming', value: 'upcoming' },
]

export const statusColor = {
    vacant: '#D2D7D3',
    live: '#19B5FE',
    // live: '#2ECC71',
    cancelled: '#CF000F',
    upcoming: '#F7CA18',
}
