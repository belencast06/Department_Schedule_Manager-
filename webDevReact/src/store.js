import {create} from 'zustand';


//boiler plate 
const useStore = create((set, getStore) => ({

    //think of this as like a class....
    instructors: [],
    courses: [],
    error: null,
    loading: true,


    retrieveData: async () => {
        try {
            console.log("Retrieving Term Data!");

            const response = await fetch('http://localhost:8080/getTermInfo');
            
            if (!response.ok) {
                throw new Error('Failed to fetch term data');
            }

            const termData = await response.json(); //res holding our term info
            console.log(termData);
            set({
                instructors: termData.instructors, 
                courses: termData.courses,
                error: "",
                loading: false
            });
            
        } catch (err) {
            set({
                loading: false,
                error: err.message
            });
        }
    },

    addCourse: async (e) => {
        e.preventDefault();

        const courseNameInput = e.target.elements[0];
        const newCourseName = courseNameInput.value.trim();

        if (newCourseName) {
            try {
                // POST to server to add course
                const response = await fetch('http://localhost:8080/addCourse', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({name: newCourseName})
                });

                if (!response.ok) {
                    throw new Error('Failed to add course to server');
                }

                const newCourse = await response.json();

                // FIXED: Use getStore() to access current courses, then update with set()
                set(state => ({
                    courses: [...state.courses, newCourse]
                }));

                courseNameInput.value = '';
            } catch (error) {
                console.error('Error adding course:', error);
                alert('Failed to add course. Please try again.');
            }
        }
    },

    // Section management actions
    addSection: async (courseId, instructorId) => {
        try {
            const response = await fetch('http://localhost:8080/addSection', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    course_id: courseId,
                    instructor_id: instructorId
                })
            });

            if (!response.ok) {
                throw new Error('Failed to add section to server');
            }

            const newSection = await response.json();

            // Update the specific course's sections
            set(state => ({
                courses: state.courses.map(course =>
                    course.id === courseId
                        ? { ...course, sections: [...course.sections, newSection] }
                        : course
                )
            }));

        } catch (err) {
            console.error('Error adding section:', err);
            alert('Failed to add section. Try again.');
        }
    },

    updateSection: async (sectionId, newInstructorId) => {
        try {
            const response = await fetch('http://localhost:8080/updateSection', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    section_id: sectionId,
                    instructor_id: newInstructorId
                })
            });

            if (!response.ok) {
                throw new Error('Failed to update section on server');
            }

            // Update the section's instructor in state
            set(state => ({
                courses: state.courses.map(course => ({
                    ...course,
                    sections: course.sections.map(section =>
                        section.id === sectionId
                            ? { ...section, instructor: newInstructorId }
                            : section
                    )
                }))
            }));

        } catch (err) {
            console.error('Error updating instructor:', err);
            alert('Failed to update instructor. Please try again.');
        }
    },

    deleteSection: async (sectionId) => {
        try {
            const response = await fetch(`http://localhost:8080/deleteSection/${sectionId}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Failed to delete section from server');
            }

            // Remove the section from state
            set(state => ({
                courses: state.courses.map(course => ({
                    ...course,
                    sections: course.sections.filter(section => section.id !== sectionId)
                }))
            }));

        } catch (err) {
            console.error('Error deleting section:', err);
            alert('Failed to delete section. Please try again.');
        }
    },
    
}));

export default useStore;