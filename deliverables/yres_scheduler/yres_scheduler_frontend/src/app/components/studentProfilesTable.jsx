import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import YresTable from './table'
import StudentEdit from '../modals/studentEdit';
import Alert from '@/app/components/alert';
import { FaPencilAlt } from 'react-icons/fa';
import { BsTrash } from 'react-icons/bs';
import { useState, useEffect } from 'react';
import { fetchDataDELETE } from '../helper';
import { useRouter } from 'next/navigation';
import Loading from './loading';   


/** 
 * Student Table that displays:
 * class Student {
   *student_id (string) 	// The auto generated unique ID
    firstname (string) 		// <UI>
    lastname (string) 		// <UI>
    age (int) 			// <UI>
    sex (string) 		// <UI>
    friend_ids (set<string>) 	// The set of student_ids of students that this student prefer to work with
    enemy_ids (set<string>) 	// The set of student_ids of students that this student doesn't want to work with
 * Props: 
        studentData - a list of student objects with above attributes
}
**/
function StudentProfilesTable({studentData}) {
    const router = useRouter();
    const [hydrated, setHydrated] = useState(false);
    const [errorDisplay, setErrorDisplay] = useState(<></>);
    const [showEdit, setShowEdit] = useState(false);
    const [editItem, setEditItem] = useState({
        student_id: -1,
        firstname: null,
        lastname: null,
        age: null,
        sex: null,
        friends_ids: [],
        enemy_ids: []
    });
    const [needRefresh, setNeedRefresh] = useState(false);

    
    const columns = [{
        dataField: '_student_ui_id',
        text: 'ID'
    },{
        dataField: 'firstname',
        text: 'First Name'
    },{
        dataField: 'lastname',
        text: 'Last Name'
    },{
        dataField: 'age',
        text: 'Age'
    },{
        dataField: 'sex',
        text: 'Sex'
    },{
        dataField: 'actions',
        text: 'Actions'
    }]

    useEffect(() => {
        // Function to process studentData with actions
        const processStudentData = async () => {
            const updatedData = await Promise.all(studentData.map(async (item) => {
                const showEditModal = () => {
                    setEditItem(item);
                    setShowEdit(true);
                };

                const deleteStudent = async () => {
                    try {
                        await fetchDataDELETE(`/student/${item._student_ui_id}/`);
                        setNeedRefresh(true);
                        router.refresh();
                    } catch (err) {
                        setErrorDisplay(<Alert complexMessage={err.message} />);
                    } 
                };

                item.actions = (
                    <div className='table-actions'>
                        <OverlayTrigger placement="right-start" overlay={<Tooltip>View/Edit Student</Tooltip>}>
                            <Button variant="success" onClick={showEditModal} className='action-button'>
                                <FaPencilAlt />
                            </Button>
                        </OverlayTrigger>
                        <OverlayTrigger placement="right-start" overlay={<Tooltip>Delete Student</Tooltip>}>
                            <Button variant="danger" onClick={deleteStudent} className='action-button'>
                                <BsTrash />
                            </Button>
                        </OverlayTrigger>
                    </div>
                );
            }));

            // Set the updated data once processing is done
            setHydrated(true);
            setNeedRefresh(false);
            return updatedData;
        };

        // Process studentData
        processStudentData();
    }, [studentData, router, needRefresh]);

    if (!hydrated) {
        return <Loading />;
    }

    return (
        <>
            {errorDisplay}
            <YresTable keyCol={'_student_ui_id'} data={studentData} columns={columns} disableHover={true}/>
            <StudentEdit
                item={editItem}
                show={showEdit}
                setShow={setShowEdit}
                students={studentData}
            />
        </>
    )   
}

export default StudentProfilesTable;