'use client';
import * as React from 'react';
import StudentProfilesTable from '@/app/components/studentProfilesTable';
import CounselorProfilesTable from '@/app/components/counselorProfilesTable';
import Button from 'react-bootstrap/Button';
import RefinedDropdown from '@/app/components/refinedDropDowns';
import StudentAdd from '@/app/modals/studentAdd'
import CounselorAdd from '@/app/modals/counselorAdd'
import { useState, useEffect } from 'react';

const PROFILE_TYPES = ['Student', 'Counselor']

const DUMMY_STUDENT_DATA = [{
    student_id: 0,
    firstname: 'Tom',
    lastname: 'Bombadil',
    age: '12',
    sex: 'Male',
    friends_ids: ['1'],
    enemy_ids: ['2', '3']
}, {
    student_id: 1,
    firstname: 'Jack',
    lastname: 'Frost',
    age: 7,
    sex: 'Male',
    friends_ids: ['0'],
    enemy_ids: []
},{
    student_id: 2,
    firstname: 'George',
    lastname: 'Washington',
    age: 8,
    sex: 'Male',
    friends_ids: ['3'],
    enemy_ids: ['1']
}, {
    student_id: 3,
    firstname: 'Abraham',
    lastname: 'Lincoln',
    age: 7,
    sex: 'Male',
    friends_ids: ['2'],
    enemy_ids: ['1']
}]

const DUMMY_COUNSELOR_DATA = [{
    counselor_id: 0,
    firstname: 'Walter',
    lastname: 'White',
    campus_id: '11',
}, {
    counselor_id: 1,
    firstname: 'Hank',
    lastname: 'Schrader',
    campus_id: '11',
},{
    counselor_id: 2,
    firstname: 'Skylar',
    lastname: 'White',
    campus_id: '12',
}, {
    counselor_id: 3,
    firstname: 'Jesse',
    lastname: 'Pinkman',
    campus_id: '12',
}]

function Profiles() {
    const [currType, setCurrType] = React.useState(PROFILE_TYPES[0]);
    const [profileData, setProfileData] = useState([]);
    const [item, setItem] = useState({});

    const handleSelectType = (e) => {
        setCurrType(e);
    }

    useEffect(() => {
        if (currType === PROFILE_TYPES[0]) {
            // TODO: Make get students API Request
            setProfileData(DUMMY_STUDENT_DATA);
        } else {
            // TODO: Make get counselors API Request
            setProfileData(DUMMY_COUNSELOR_DATA);
        }
    }, [currType]);
    
    const [show, setShow] = useState(false);
    const handleShow = () => {
        if (currType === PROFILE_TYPES[0]) {
            const object = {
                student_id: 99,
                firstname: '',
                lastname: '',
                age: '0',
                sex: '',
                friends_ids: ['1'],
                enemy_ids: ['1']
            };
            setItem(object);
            DUMMY_STUDENT_DATA.push(object)
        } else {
            const object = {
                counselor_id: 99,
                firstname: '',
                lastname: '',
                campus_id: 1
            };
            setItem(object);
            DUMMY_COUNSELOR_DATA.push(object)
        }
        setShow(true);
    };
    return (
        <>
            <div id='profiles-header'>
                <RefinedDropdown 
                    handleSelect={handleSelectType}
                    displayText={currType}
                    groups={PROFILE_TYPES}
                />
                <div className='right-align'>
                    <Button variant="primary" onClick={handleShow}>Add {currType}</Button>
                    {currType === PROFILE_TYPES[0] 
                    ? <StudentAdd
                        show={show}
                        setShow={setShow}
                        item={item}
                        students={DUMMY_STUDENT_DATA}
                        />
                    : <CounselorAdd
                        show={show}
                        setShow={setShow}
                        item={item}
                        />}
                    
                </div>
            </div>
            <div className='center-align'>
                <div id='profiles-table'>
                    {currType === PROFILE_TYPES[0] ? 
                        <StudentProfilesTable studentData={profileData}/> : 
                        <CounselorProfilesTable counselorData={profileData}/>}
                </div>
            </div>
        </>
    )
}

export default Profiles;