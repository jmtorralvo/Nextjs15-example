'use client'

import { useFormStatus } from 'react-dom';

export default function submitFormButton({ title }) {
  const submittingMsg = 'Submitting...';
  const {pending} = useFormStatus();

  return (
    <button type="submit" disabled={pending}>{pending ? submittingMsg :title}</button>
  );
} 