import React from 'react';
import { Button, Card, Divider, Typography } from 'antd';
import {
  displayErrorMessage,
  formatListingPrice,
} from '../../../../lib/components/utils';
import { DatePicker } from '../../../../lib/components/DatePicker';
import { endOfDay, isBefore } from 'date-fns';

interface ListingCreateBookingProps {
  price: number;
  checkInDate: Date | null;
  checkOutDate: Date | null;
  setCheckInDate: (checkInDate: Date | null) => void;
  setCheckOutDate: (checkOutDate: Date | null) => void;
}

const { Paragraph, Title } = Typography;

export const ListingCreateBooking = ({
  price,
  checkInDate,
  setCheckInDate,
  setCheckOutDate,
  checkOutDate,
}: ListingCreateBookingProps) => {
  const disabledDate = (currentDate?: Date) => {
    if (currentDate) {
      return isBefore(endOfDay(currentDate), Date.now());
    } else {
      return false;
    }
  };

  const verifyAndSetCheckOutDate = (selectedCheckOutDate: Date | null) => {
    if (selectedCheckOutDate && checkInDate) {
      if (isBefore(selectedCheckOutDate, checkInDate)) {
        return displayErrorMessage(
          "You can't book date of check out to be prior to check in!",
        );
      }
    }

    setCheckOutDate(selectedCheckOutDate);
  };

  const checkOutDisabled = !checkInDate;
  const buttonDisabled = !checkInDate || !checkOutDate;

  return (
    <div className="listing-booking">
      <Card className="listing-booking__card">
        <div>
          <Paragraph>
            <Title level={2} className="listing-booking__card-title">
              {formatListingPrice(price)}
              <span>/day</span>
            </Title>
          </Paragraph>
          <Divider />
          <div className="listing-booking__card-date-picker">
            <Paragraph strong>Check In</Paragraph>
            <DatePicker
              value={checkInDate ? checkInDate : undefined}
              format={'YYYY/MM/DD'}
              showToday={false}
              disabledDate={disabledDate}
              onChange={dateValue => setCheckInDate(dateValue)}
              onOpenChange={() => setCheckOutDate(null)}
            />
          </div>
          <div className="listing-booking__card-date-picker">
            <Paragraph strong>Check Out</Paragraph>
            <DatePicker
              value={checkOutDate ? checkOutDate : undefined}
              format={'YYYY/MM/DD'}
              showToday={false}
              disabled={checkOutDisabled}
              disabledDate={disabledDate}
              onChange={dateValue => verifyAndSetCheckOutDate(dateValue)}
            />
          </div>
        </div>
        <Divider />
        <Button
          disabled={buttonDisabled}
          size="large"
          type="primary"
          className="listing-booking__card-cta"
        >
          Request to book!
        </Button>
      </Card>
    </div>
  );
};
