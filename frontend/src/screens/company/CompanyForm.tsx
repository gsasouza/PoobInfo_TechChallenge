import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Formik, FormikProps } from "formik";
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

type Props = {
  isEditing?: boolean,
} & SnackbarContextProps & RouteComponentProps<{}>;

type Values = {
  name: string,
};

type State = {
  data: Values
}

class CompanyForm extends React.Component<Props, State> {

  state = {
    data: {
      name: '',
    }
  };

  async componentDidMount() {
    const { isEditing, match } = this.props;
    const { _id } = match.params;
    if (isEditing) {
      const { status, data } = await api(`/company/${_id}`);
      if (status === 200) return this.setState({ data });
    }
  }

  render() {
    const { data } = this.state;
    const { history, showSnackbar, isEditing, match } = this.props;

    return (
      <Formik
        key={JSON.stringify(data)}
        initialValues={{
          ...data,
        }}
        validationSchema={
          yup.object().shape({
            name: yup.string().required(),
          })
        }
        onSubmit={async (values: Values) => {
          try {
            const { _id } = match.params;

            const method = isEditing ? 'put' : 'post';
            const route = isEditing ? `/company/${_id}` : '/company';
            const { status, message } = await api(route, method, values);

            if (status === 201 || status === 200) {
              showSnackbar({ message });
              return history.push('/companies')
            }
            return showSnackbar({ message: 'An error occurred, try again later'})
          } catch (e) {
            console.log(e);
            return showSnackbar({ message: 'An error occurred, try again later'})
          }

        }}
        render={({ isValid, handleChange, handleSubmit, values }: FormikProps<Values>) => (
          <Wrapper>
            <FormContainer>
              <Paper>
                <TextField fullWidth placeholder={'Name'} value={values.name} name={'name'} onChange={handleChange}/>
                <ButtonContainer>
                  <Button onClick={history.goBack}>
                    Cancel
                  </Button>
                  <Button disabled={!isValid} variant={'contained'} color={'primary'} onClick={(e) => handleSubmit(e)}>
                    { isEditing ? 'Edit' : 'Create'}
                  </Button>
                </ButtonContainer>
              </Paper>
            </FormContainer>
          </Wrapper>
        )}
      />
    )
  }
}

export default withSnackbar(CompanyForm);
