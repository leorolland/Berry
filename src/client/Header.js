import React, { Component } from 'react';

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = { atTop: true }
        this.handleScroll = this.handleScroll.bind(this)
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll)
    }

    handleScroll() {
        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50)
            this.setState({ atTop: false })
        else this.setState({ atTop: true })
    }

    render() {
        const { atTop } = this.state
        return (
            <>
                <div className={atTop ? 'header header-atTop' : 'header header-notAtTop'}></div>
                <div className={atTop ?
                    'header header-fixed header-atTop'
                    : 'header header-fixed header-notAtTop'}>
                    <h1>{this.props.title}</h1>
                </div>
            </>
        )
    }
}
