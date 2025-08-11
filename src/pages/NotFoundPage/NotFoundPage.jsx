import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import logo from "~/assets/images/logoMain.jpg";
import { useLocation } from 'react-router-dom';
import './NotFoundPage.scss'
export default function Error() {
    const handleHome = () => {
        document.location = '/'
    }
    return (
        <div className="background-not-found">
            <div className="top">
                <h1>404</h1>
                <h3>Ôi không! Bé đã đi lạc rồi :v</h3>
            </div>
            <div className="container">
                <div className="ghost-copy">
                    <div className="one"></div>
                    <div className="two"></div>
                    <div className="three"></div>
                    <div className="four"></div>
                </div>
                <div className="ghost">
                    <div className="face">
                        <div className="eye"></div>
                        <div className="eye-right"></div>
                        <div className="mouth"></div>
                    </div>
                </div>
                <div className="shadow"></div>
            </div>
            <div className="bottom">
                <p>Trở lại</p>
            </div>
            <div className="buttons">
                <Button className="btn" onClick={handleHome}>Quay lại trang chủ</Button>
            </div>
        </div>

    );
}