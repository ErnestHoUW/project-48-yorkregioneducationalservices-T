-- Initalization 
drop schema if exists yres cascade; 
create schema yres;
set search_path to yres;


-- Represents a campus with rooms for camps to take place 
-- Columns:
    -- campus_id : The auto generated unique ID
    -- name : <UI> The name of the campus
create table Campus (
    campus_id serial primary key,
    name text not null
);


-- Represents a camp, i.e. a classification of groups (based on program type and/or student age)
-- Columns:
    -- camp_id : The auto generated unique ID
    -- name : <UI> The name of the camp
    -- campus_id : Foredign key constraint
create table Camp (
    camp_id serial primary key,
    name text not null,
    campus_id integer references Campus
);

-- Represents the generated schedule of a group
-- Columns:
    -- schedule_id : The auto generated unique ID
    -- start_time :  The start moment of this schedule
    -- end_time : The end moment of this schedule
create table Schedule (
    schedule_id serial primary key,
    start_time time not null, 
    end_time time not null 
);


-- Represents a group, i.e. an instance of a camp  Decide if I should be keeping it 
-- Columns:
    -- camp_group_id : The auto generated unique ID
    -- schedule_id : The ID of the schedule of this group
    -- camp_id : The ID of the camp this group belongs to
create table CampGroup (
    camp_group_id serial primary key,		
    schedule_id integer references Schedule,  
    camp_id integer references Camp 		   
);


-- Represents a counselor that teaches in a group 
-- Columns:
    -- counselor_id : The auto generated unique ID
    -- firstname : <UI> 
    -- lastname : <UI>
    -- campus_id : <UI> The ID of the campus this counselor will teach in
    -- camp_group_id : The foreign key constraint
create table Counselor (
    counselor_id serial primary key,
    firstname text not null,
    lastname text not null, 
    campus_id integer references Campus,  
    camp_group_id integer references CampGroup  
);


-- Represents a student that studies in a group 
-- Columns:
    -- student_id : The auto generated unique id
    -- student_ui_id: The student id that is associated with the student on the UI and the imported csv file
    -- first : <UI>
    -- lastname : <UI>
    -- age : <UI>
    -- sex : <UI>
    -- camp_group_id : Foreign key constraint
    -- campus_id : Foreign Key constraint
create table Student (
    student_id serial primary key,           
    student_ui_id int unique not null, 
    firstname text not null,
    lastname text not null,
    age integer not null,
    sex text not null,
    camp_group_id integer references CampGroup,
    campus_id integer references Campus
);


-- The friend preferences for all the students.
-- Columns:
    -- student_id1 : The student id of the first friend
    -- student_id2 : The student id of the second friend 
    -- is_apart : If the students should be apart
create table FriendPreference (
    student_id1 integer not null references Student(student_id) on delete cascade, 
    student_id2 integer not null references Student(student_id) on delete cascade, 
    is_apart bool not null,     
    primary key (student_id1, student_id2), -- Primary key 
    check (student_id1 > student_id2) -- Make sure they are not duplicates
);


-- Represents an administrator, the only type of user that can access the app
-- Columns:
    -- username : The admin login username
    -- password : The admin login hash password
create table LoginInfo (
    username text primary key,
    password text not null
);


-- All the rooms in the summer camp.
-- Columns:
    -- room_id : The auto generated unique ID
    -- name : <UI> The name of the room
    -- campus_id : Foreign key constraint
create table Room (
    room_id serial primary key,
    name text not null,
    campus_id integer references Campus 
);



-- Represents an activity that all groups of a type of camp will be scheduled to do 
-- Columns:
    -- activity_id :  The auto generated unique ID
    -- name :  <UI> The name of the activity
    -- duration :  <UI> The number of hours this activity takes
    -- type : <UI> The type of the activity (filler / common)
    -- num_occurences <UI> The number of times this activity should be scheduled for each group. It is fixed for a common activity, or the minimum number of times for a filler activity.
    -- camp_id : Foreign Key constraint
create table Activity (
    activity_id serial primary key,	
    name text not null, 		
    duration integer not null,
    type text not null,
    num_occurences integer not null,
    camp_id integer references Camp
);


-- Intermediary table for many-to-many relationship between Rooms and Activities.
-- Columns:
    -- room_id : The id of the room
    -- activty_id : The id of the activity
create table RoomActivity (	
    activity_id integer references Activity on delete cascade,
    room_id integer references Room on delete cascade,
    primary key (activity_id, room_id)
);


-- Represents a block in a schedule, specifying when an activity of a group starts and end in the schedule */
-- Columns:
    -- block_id : The auto generated unique ID
    -- room_id : The ID of the room this block occupies
    -- activity_id : The ID of the activity of this block
    -- start_time : The start moment of this block
    -- end_time : The end moment of this block
    -- schedule_id : Foreign key constraint    
create table Block (
    block_id serial primary key,		
    room_id integer not null references Room on delete cascade,
    activity_id integer not null references Activity on delete cascade,
    start_time time not null,
    end_time time not null,
    schedule_id integer references Schedule 
);

insert into Campus (name) values ('Campus 1');
insert into Camp (name, campus_id) values ('Camp 1', '1');