import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserReadings, removeReading } from '../store/actions/readings';
import { fetchSummary, removeSummary } from '../store/actions/summary';
import ReadingItem from '../components/ReadingItem';

class UserReadingsList extends Component {
    componentDidMount() {
        this.props.fetchUserReadings();
    }
// clear reading state whenever logged out or failed login
    render() {
        const { readings, removeReading, summary, fetchSummary, removeSummary  } = this.props; //currentUser
        let userReadingsList = readings.map(r => (
            <ReadingItem
                key={r.id}
                id={r.id}
                url={r.url}
                word_count={r.word_count}
                title={r.title}
                domain={r.domain}
                user_id={r.user_id}
                summary={summary.summary}
                viewSummary={fetchSummary.bind(this, r.id, r.article_url)}
                removeSummary={removeSummary}
                removeReading={removeReading.bind(this, r.user_id, r.id)}
            />
        ));
        return (
            <div className='row col-sm-8'>
                {this.props.readings.length ? (
                    <div className='offset-1 col-sm-10'>
                        <div className='list-group' id='readings'>
                            {userReadingsList}
                        </div>
                    </div>
                ) : (
                    <h2>You haven't read anything... Yet!!</h2>
                )}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        readings: state.readings,
        summary: state.summary
        // currentUser: state.currentUser
        
    }
}

export default connect(mapStateToProps, { fetchUserReadings, fetchSummary, removeReading, removeSummary })(UserReadingsList);