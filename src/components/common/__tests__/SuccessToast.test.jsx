import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import SuccessToast from '../SuccessToast';

describe('SuccessToast', () => {
  let onCloseMock;
  let defaultProps;

  beforeEach(() => {
    vi.useFakeTimers();
    onCloseMock = vi.fn();
    defaultProps = {
      show: true,
      onClose: onCloseMock,
      message: 'Success!',
      subMessage: 'Item added.',
    };
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it('renders correctly when show is true', () => {
    render(<SuccessToast {...defaultProps} />);
    expect(screen.getByText('Success!')).toBeInTheDocument();
    expect(screen.getByText('Item added.')).toBeInTheDocument();
  });

  it('does not render when show is false', () => {
    render(<SuccessToast {...defaultProps} show={false} />);
    expect(screen.queryByText('Success!')).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    render(<SuccessToast {...defaultProps} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('calls onClose after 3 seconds', () => {
    render(<SuccessToast {...defaultProps} />);
    
    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
