import { Form, Field } from 'react-final-form'
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, Button, Box, 
    FormControl, FormLabel, FormControlLabel, 
    RadioGroup, Radio, FormHelperText
} from '@mui/material'
import NumberField from './NumberField';
import type { Member } from '../types/member'

interface Props {
    member: Member
    onSave: (changes: Partial<Member>) => void
    onClose: () => void
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


export function EditMemberModal({ member, onSave, onClose }: Props) {
    const handleSubmit = (values: Partial<Member>) => {
        onSave({
            ...values,
            pace: String(values.paceMin) + ":" + String(values.paceSec),
        })
        onClose()
    }

    return (
        <Dialog open onClose={onClose} fullWidth maxWidth="xs">
        <Form
            initialValues={{ name: member.name, email: member.email, gender: member.gender, age: member.age, paceMin: member.paceMin, paceSec: member.paceSec}}
            onSubmit={handleSubmit}
            render={({ handleSubmit, submitting, pristine }) => (
                <form onSubmit={handleSubmit}>

                    <DialogTitle>Edit Member Information</DialogTitle>

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
                                        <FormLabel>Gender</FormLabel>
                                        <RadioGroup {...input} row>
                                            <FormControlLabel value="Male"   control={<Radio />} label="Male" />
                                            <FormControlLabel value="Female" control={<Radio />} label="Female" />
                                            <FormControlLabel value="Other"  control={<Radio />} label="Other" />
                                        </RadioGroup>
                                        {meta.touched && meta.error && (
                                            <FormHelperText>{meta.error}</FormHelperText>
                                        )}
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
                    <Button onClick={onClose}>cancel</Button>
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
        </Dialog>
    )
}