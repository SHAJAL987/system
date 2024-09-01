import { FormHelperText, Grid, InputLabel, OutlinedInput, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { saveAppUrl } from 'utils/apiList';
import { getTokenFromSessionStorage } from 'utils/tokenUtils';

export default function CreateAppForm() {
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(false);

    // Function to get token from session storage
    const getTokenFromSessionStorage = () => {
        return sessionStorage.getItem('authToken'); // Replace 'authToken' with your actual token key
    };

    return (
        <Formik
            initialValues={{
                appName: '',
                appUrl: '',
                appDesc: '',
                appStatus: 'A',
                submit: null
            }}
            validationSchema={Yup.object().shape({
                appName: Yup.string().required('Application name is required'),
                appUrl: Yup.string()
                    .matches(
                        /^(https?:\/\/)?((localhost)|(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}))(:\d+)?(\/[\w-]*)*\/?$/,
                        'Invalid URL format'
                    )
                    .required('Application URL is required'),
                appDesc: Yup.string().required('Application description is required')
            })}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                try {
                    const token = getTokenFromSessionStorage();
                    if (!token) {
                        console.error('No token found');
                        return navigate('/login');
                    }

                    const response = await axios.post(saveAppUrl, {
                        appName: values.appName,
                        appUrl: values.appUrl,
                        appDesc: values.appDesc,
                        appStatus: values.appStatus
                    }, {
                        headers: {
                            'Authorization': `Bearer ${token}` // Include token in request header
                        }
                    });

                    if (response.data) {
                        setStatus({ success: true });
                        console.log('Application creation successful:', response.data);
                        navigate('/home');
                    }
                } catch (error) {
                    console.error('Application creation error:', error);
                    setStatus({ success: false });
                    setErrors({ submit: error.response ? error.response.data.message : 'Application creation failed' });
                } finally {
                    setSubmitting(false);
                }
            }}
        >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                <form noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="appName">Application Name</InputLabel>
                                <OutlinedInput
                                    id="appName"
                                    type="text"
                                    value={values.appName}
                                    name="appName"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    placeholder="Enter application name"
                                    fullWidth
                                    error={Boolean(touched.appName && errors.appName)}
                                />
                                {touched.appName && errors.appName && (
                                    <FormHelperText error id="appName-error-text">
                                        {errors.appName}
                                    </FormHelperText>
                                )}
                            </Stack>
                        </Grid>
                        <Grid item xs={12}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="appUrl">Application URL</InputLabel>
                                <OutlinedInput
                                    id="appUrl"
                                    type="text"
                                    value={values.appUrl}
                                    name="appUrl"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    placeholder="Enter application URL"
                                    fullWidth
                                    error={Boolean(touched.appUrl && errors.appUrl)}
                                />
                                {touched.appUrl && errors.appUrl && (
                                    <FormHelperText error id="appUrl-error-text">
                                        {errors.appUrl}
                                    </FormHelperText>
                                )}
                            </Stack>
                        </Grid>
                        <Grid item xs={12}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="appDesc">Application Description</InputLabel>
                                <OutlinedInput
                                    id="appDesc"
                                    type="text"
                                    value={values.appDesc}
                                    name="appDesc"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    placeholder="Enter application description"
                                    fullWidth
                                    error={Boolean(touched.appDesc && errors.appDesc)}
                                />
                                {touched.appDesc && errors.appDesc && (
                                    <FormHelperText error id="appDesc-error-text">
                                        {errors.appDesc}
                                    </FormHelperText>
                                )}
                            </Stack>
                        </Grid>
                        {errors.submit && (
                            <Grid item xs={12}>
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            </Grid>
                        )}
                        <Grid item xs={12}>
                            <LoadingButton
                                disableElevation 
                                disabled={isSubmitting}
                                color="error"
                                loading={loading}
                                loadingPosition="end"
                                variant="contained"
                                endIcon={<SendOutlinedIcon />}
                                type="submit"
                            >
                                Submit
                            </LoadingButton>
                        </Grid>
                    </Grid>
                </form>
            )}
        </Formik>
    );
}

// PropTypes validation
CreateAppForm.propTypes = {
    appName: PropTypes.string,
    appUrl: PropTypes.string,
    appDesc: PropTypes.string,
};
