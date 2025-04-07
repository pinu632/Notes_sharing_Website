import { useState, useEffect } from "react";
import './profileC.css';
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import config from "../../../config.js";

export function CompleteProfile() {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        name: "",
        dob: "",
        gender: "",
        hometown: "",
        college: "",
        course: "",
        semester: "",
        
    });

    const navigate = useNavigate();

    const { mutate, isError, isPending, error } = useMutation({
        mutationFn: async () => {
            try {
                const res = await fetch(`${config.baseUrl}/api/profile/profileCompletion`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify(formData),
                });

                const responseData = await res.json(); // Avoid naming conflict
                if (responseData.error) throw new Error(responseData.error);

                if (res.ok) {
                    navigate('/Dashboard');
                } else {
                    throw new Error("Something went wrong");
                }

                return responseData;
            } catch (error) {
                console.log(error);
                throw error;
            }
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentStep === 2) {
            const formWithImage = new FormData();
            Object.keys(formData).forEach((key) => {
                formWithImage.append(key, formData[key]);
            });
            mutate(formWithImage);
        } else {
            nextStep();
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]:value});
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
       
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, profilepic: reader.result }); // Sets base64 string
            };
            reader.readAsDataURL(file);
        }
    };

    const steps = [
        'Personal Details',
        'Academic Details',
        'Profile Picture'
    ];

    const nextStep = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const progressPercentage = ((currentStep + 1) / steps.length) * 100;

    const renderStepContent = (stepIndex) => {
        switch (stepIndex) {
            case 0:
                return (
                    <div>
                        <h3>Personal Information</h3>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Enter your full name"
                        />
                        <div className="form-group">
                            <label htmlFor="dob">Date of Birth</label>
                            <input
                                type="date"
                                name="dob"
                                value={formData.dob}
                                onChange={handleInputChange}
                            />
                        </div>
                        <select
                            name="gender"
                            id="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                            className="gender"
                        >
                            <option value="" disabled>Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                        <input
                            type="text"
                            placeholder="Hometown"
                            name="hometown"
                            value={formData.hometown}
                            onChange={handleInputChange}
                        />
                    </div>
                );

            case 1:
                return (
                    <div>
                        <h3>Academic Information</h3>
                        <input
                            type="text"
                            name="college"
                            placeholder="Enter college Name"
                            value={formData.college}
                            onChange={handleInputChange}
                        />
                        <select
                            name="course"
                            value={formData.course}
                            onChange={handleInputChange}
                        >
                            <option value="" disabled>Select a course</option>
                            <option value="computer_science">Computer Science</option>
                            <option value="information_technology">Information Technology</option>
                            <option value="mechanical_engineering">Mechanical Engineering</option>
                            <option value="civil_engineering">Civil Engineering</option>
                            <option value="electronics_communication">Electronics and Communication</option>
                            <option value="electrical_engineering">Electrical Engineering</option>
                            <option value="biotechnology">Biotechnology</option>
                            <option value="business_administration">Business Administration</option>
                            <option value="environmental_science">Environmental Science</option>
                            <option value="data_science">Data Science</option>
                        </select>
                        <input
                            type="number"
                            name="semester"
                            value={formData.semester}
                            onChange={handleInputChange}
                            placeholder="Enter semester"
                        />
                    </div>
                );

            case 2:
                return (
                    <div>
                        <h3>Profile Picture</h3>
                        <div className="profilepic">
                            {formData.profilepic && <img src={formData.profilepic} alt="Profile Preview" height={"100%"} width={"100%"} style={{borderRadius:"50%"}} />}
                        </div>
                        <input type="file" name="profilepic" onChange={handleFileChange} />
                    </div>
                );

            default:
                return <div>No div Found</div>;
        }
    };

    useEffect(() => {
        return () => {
            if (formData.profilepic) {
                URL.revokeObjectURL(URL.createObjectURL(formData.profilepic)); // Clean up URL object
            }
        };
    }, [formData.profilepic]);

    return (
        <div className="large-container">
            <div className="container">
                <h1>Complete Your Profile</h1>

                <div className="progress-bar">
                    <div className="progress" style={{ width: `${progressPercentage}%` }}></div>
                </div>

                <div className="steps">
                    {steps.map((step, index) => {
                        
                            <div key={index} className={`step ${currentStep === index ? 'active' : ''}`}>
                                {step}
                            </div>
                        
                    })}
                </div>

                <form className="step-content" onSubmit={handleSubmit}>
                    {renderStepContent(currentStep)}

                    <div className="navigation">
                        <button type="button" disabled={currentStep === 0} onClick={prevStep}>
                            Previous
                        </button>
                        <button type="submit" disabled={isPending}>
                            {isPending ? "Submitting..." : currentStep === steps.length - 1 ? "Complete" : "Next"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
