import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Formik, FormikProps } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';

import api from '../../api/api';
import { withSnackbar } from '../../hoc';
import { SnackbarContextProps } from '../../context/SnackbarContext';

const FormContainer = styled.div`
  > div {
    display: flex;
    flex-direction: column;
    padding: 20px;
    height: 100%;
    justify-content: space-between;    
  }
  margin-top: 15px;
  height: 15vh;
  width: 60vw;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;


type Props = RouteComponentProps<{}> & SnackbarContextProps;

type Values = {
  name: string,
};

const CompanyAdd = (props: Props) => {
  const { history, showSnackbar } = props;
  return (
    <Formik
      initialValues={{
        name: '',
      }}
      validationSchema={
        yup.object().shape({
          name: yup.string().required(),
        })
      }
      onSubmit={async (values: Values) => {
        try {
          const { status, message } = await api('/company', 'post', values);
          if (status === 201) {
            showSnackbar({ message });
            return history.push('/companies')
          }
          return showSnackbar({ message: 'An error occurred when try to add a company'})
        } catch (e) {
          return showSnackbar({ message: 'An error occurred when try to add a company'})
        }

      }}
      render={({ isValid, handleChange, handleSubmit }: FormikProps<{}>) => (
        <Wrapper>
          <FormContainer>
            <Paper>
              <TextField fullWidth placeholder={'Name'} name={'name'} onChange={handleChange}/>
              <ButtonContainer>
                <Button onClick={history.goBack}>
                  Cancel
                </Button>
                <Button disabled={!isValid} variant={'contained'} color={'primary'} onClick={(e) => handleSubmit(e)}>
                  Create
                </Button>
              </ButtonContainer>
            </Paper>
          </FormContainer>
        </Wrapper>
      )}
    />
  )
};

export default withSnackbar(CompanyAdd);
