import { Form, Field } from 'react-final-form'
import {
    DialogContent, DialogActions,
    TextField, Button, Box, 
    FormControl, FormLabel, FormControlLabel, 
    RadioGroup, Radio, FormHelperText
} from '@mui/material'
import NumberField from './NumberField';
import type { Member, MemberFormValues } from '../types/member'

interface Props {
    member?: Member,
    handleSubmit: (values: MemberFormValues) => void,
    handleCancel: () => void
}

const defaultValues: MemberFormValues = {
  name: '',
  email: '',
  gender: 'Male',
  age: 0,
  paceMin: 5,
  paceSec: 0
}

// validators
const required = (value: any) =>
    value ? undefined : 'Required'

const validEmail = (value: string) => {
    if (!value) return 'Required'
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        ? undefined
        : 'Invalid email'
}

const mustBeNumber = (value: number) => (isNaN(value) ? 'Must be a number' : undefined)

const composeValidators = (...validators: any[]) => (value: any) =>
    validators.reduce((error, validator) => error || validator(value), undefined)

export default function MemberInfoForm({
    member,
    handleSubmit,
    handleCancel
} : Props) {
    const initialValues: MemberFormValues = member
        ? { name: member.name, email: member.email, gender: member.gender,
            age: member.age, paceMin: member.paceMin, paceSec: member.paceSec}
        : defaultValues
    return (
        <Form
            initialValues={initialValues}
            onSubmit={handleSubmit}
            render={({ handleSubmit, submitting, pristine }) => (
                <form onSubmit={handleSubmit}>

                    <DialogContent>
                        <Box sx={{display: 'flex', flexDirection: 'column', gap: 2, pt: 2}}>
                            <Field name="name" validate={required}>
                                {({ input, meta }) => (
                                    <TextField
                                        {...input}
                                        label="Full name"
                                        fullWidth
                                        error={meta.touched && !!meta.error}
                                        helperText={meta.touched && meta.error}
                                    />
                                )}
                            </Field>
                            <Field name="email" validate={composeValidators(required, validEmail)}>
                                {({ input, meta }) => (
                                    <TextField
                                        {...input}
                                        label="Email"
                                        fullWidth
                                        error={meta.touched && !!meta.error}
                                        helperText={meta.touched && meta.error}
                                    />
                                )}
                            </Field>
                            <Field name="age" validate={composeValidators(required, mustBeNumber)}>
                                {({ input, meta }) => (
                                    <NumberField
                                        label="Age"
                                        min={0}
                                        max={100}
                                        value={input.value === '' ? undefined : Number(input.value)}
                                        onValueChange={(value) => input.onChange(value ?? '')}
                                        onBlur={input.onBlur}
                                        onFocus={input.onFocus}
                                        error={meta.touched && !!meta.error}
                                        helperText={meta.touched && meta.error}
                                    />
                                )}
                            </Field>
                            <Field name="gender" validate={required}>
                                {({ input, meta }) => (
                                    <FormControl error={meta.touched && !!meta.error}>
                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'flex-start' }}>
                                            <FormLabel>Gender</FormLabel>
                                            <RadioGroup {...input} row>
                                                <FormControlLabel value="Male"   control={<Radio />} label="Male" />
                                                <FormControlLabel value="Female" control={<Radio />} label="Female" />
                                                <FormControlLabel value="Other"  control={<Radio />} label="Other" />
                                            </RadioGroup>
                                            {meta.touched && meta.error && (
                                                <FormHelperText>{meta.error}</FormHelperText>
                                            )}
                                        </Box>
                                    </FormControl>
                                )}
                            </Field>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'flex-start' }}>
                                <FormLabel>Pace(min/km)</FormLabel>
                                <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
                                    <Field name="paceMin" validate={required}>
                                        {({ input, meta }) => (
                                            <NumberField
                                                {...input}
                                                label="Minute"
                                                min={0}
                                                max={59}
                                                value={input.value === '' ? undefined : Number(input.value)}
                                                onValueChange={(value) => input.onChange(value ?? '')}
                                                onBlur={input.onBlur}
                                                onFocus={input.onFocus}
                                                error={meta.touched && !!meta.error}
                                                helperText={meta.touched && meta.error}
                                            />
                                        )}
                                    </Field>

                                    <Box sx={{ mt: 2, fontWeight: 500, fontSize: 20 }}>:</Box>

                                    <Field name="paceSec" validate={composeValidators(required)}>
                                        {({ input, meta }) => (
                                            <NumberField
                                                {...input}
                                                label="Second"
                                                min={0}
                                                max={59}
                                                value={input.value === '' ? undefined : Number(input.value)}
                                                onValueChange={(value) => input.onChange(value ?? '')}
                                                onBlur={input.onBlur}
                                                onFocus={input.onFocus}
                                                error={meta.touched && !!meta.error}
                                                helperText={meta.touched && meta.error}
                                            />
                                        )}
                                    </Field>
                                </Box>
                            </Box>
                        </Box>
                    </DialogContent>

                    <DialogActions>
                    <Button onClick={handleCancel}>cancel</Button>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={submitting || pristine}
                        sx={{borderRadius: 10, height: 40}}
                    >
                        submit
                    </Button>
                    </DialogActions>

                </form>
            )}
        />
    )
}