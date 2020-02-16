import { createStore, AnyAction } from 'redux';
import { ACTIONS } from '../actions/main';
import { TmainState, TACTIONS } from '../../types';

//works is a data array, it can be fetched from some server by redux-thunk 

const initialState: TmainState = {
    routes: ['/home'],
    works: [['https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/5106cda8-4842-43ca-a632-6b7c46b6b808/d4rnmov-e5ebdd52-2edf-4c0d-a396-c580f5183920.png/v1/fill/w_894,h_894,q_70,strp/dripping_by_pitel_d4rnmov-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTIwMCIsInBhdGgiOiJcL2ZcLzUxMDZjZGE4LTQ4NDItNDNjYS1hNjMyLTZiN2M0NmI2YjgwOFwvZDRybm1vdi1lNWViZGQ1Mi0yZWRmLTRjMGQtYTM5Ni1jNTgwZjUxODM5MjAucG5nIiwid2lkdGgiOiI8PTEyMDAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.otpnY80z6kw93vZZInW-Gzq97MFsLXuKuEf1F0WdNdY',
        ['"Dripping" by Pitel is licensed under CC BY 3.0',
            'https://www.deviantart.com/pitel/art/Dripping-288316831',
            'https://www.deviantart.com/pitel',
            'https://creativecommons.org/licenses/by/3.0/?ref=ccsearch&atype=rich']
    ],
    ['https://farm2.staticflickr.com/1648/25561336655_5021a21147_b.jpg',
        ['"Superior art" by kevin dooley is licensed under CC BY 2.0',
            'https://www.flickr.com/photos/12836528@N00/25561336655',
            'https://www.flickr.com/photos/12836528@N00',
            'https://creativecommons.org/licenses/by/2.0/?ref=ccsearch&atype=rich'],],
    ['https://live.staticflickr.com/3805/9019559784_95a6a9a163_b.jpg',
        ['"Boston Museum of Fine Arts" by Si B is licensed under CC BY 2.0',
            'https://www.flickr.com/photos/75579135@N00/9019559784',
            'https://www.flickr.com/photos/75579135@N00',
            'https://creativecommons.org/licenses/by/2.0/?ref=ccsearch&atype=rich']],
    ['https://farm9.staticflickr.com/8775/18190488136_3bab22a826.jpg',
        ['"More coffee shop art #art #epfl..." by jeremiah.andrick is licensed under CC BY 2.0',
            'https://www.flickr.com/photos/9368841@N07/18190488136',
            'https://www.flickr.com/photos/9368841@N07',
            'https://creativecommons.org/licenses/by/2.0/?ref=ccsearch&atype=rich']],
    ['https://live.staticflickr.com/7226/6862438240_ed622cf929_b.jpg',
        ['"Thi-Thanh-Tâm" by Pascal Maramis is licensed under CC BY 2.0',
            'https://www.flickr.com/photos/69101012@N04/6862438240',
            'https://www.flickr.com/photos/69101012@N04',
            'https://creativecommons.org/licenses/by/2.0/?ref=ccsearch&atype=rich']],
    ['https://live.staticflickr.com/7062/7003504291_2f8c8609af_b.jpg',
        ['"House of art" by Janels Katlaps is licensed under CC BY 2.0',
            'https://www.flickr.com/photos/36356869@N02/7003504291',
            'https://www.flickr.com/photos/36356869@N02',
            'https://creativecommons.org/licenses/by/2.0/?ref=ccsearch&atype=rich']],
    ['https://live.staticflickr.com/1935/43424378830_079f1af5a1_b.jpg',
        ['"Tempe Center for the Arts" by kevin dooley is licensed under CC BY 2.0',
            'https://www.flickr.com/photos/12836528@N00/43424378830',
            'https://www.flickr.com/photos/12836528@N00',
            'https://creativecommons.org/licenses/by/2.0/?ref=ccsearch&atype=rich']],
    ['https://farm9.staticflickr.com/8871/18029751368_4eb3f4aa82.jpg',
        ['"Street art at night Seattle #art..." by jeremiah.andrick is licensed under CC BY 2.0',
            'https://www.flickr.com/photos/9368841@N07/18029751368',
            'https://www.flickr.com/photos/9368841@N07',
            'https://creativecommons.org/licenses/by/2.0/?ref=ccsearch&atype=rich']],
    ['https://farm8.staticflickr.com/7010/6607063127_522688ac4c_b.jpg',
        ['"terry_abstract 91_2_72 - Abstract Art Images" by BTerryComptonPhotography is licensed under CC BY-SA 2.0',
            'https://www.flickr.com/photos/41260125@N05/6607063127',
            'https://www.flickr.com/photos/41260125@N05',
            'https://creativecommons.org/licenses/by-sa/2.0/?ref=ccsearch&atype=rich']],
    ['https://farm9.staticflickr.com/8524/8525569567_8244e8847b.jpg',
        ['"#wicker #art from #star #design showcased on the wicker furniture blog ." by Wicker Paradise is licensed under CC BY 2.0',
            'https://www.flickr.com/photos/76061588@N03/8525569567',
            'https://www.flickr.com/photos/76061588@N03',
            'https://creativecommons.org/licenses/by/2.0/?ref=ccsearch&atype=rich']],
    ['https://live.staticflickr.com/5209/5208671435_75cd36711c_b.jpg',
        ['"DSC09685" by scalleja is licensed under CC BY-SA 2.0',
            'https://www.flickr.com/photos/24899877@N00/5208671435',
            'https://www.flickr.com/photos/24899877@N00',
            'https://creativecommons.org/licenses/by-sa/2.0/?ref=ccsearch&atype=rich']],
    ],
    selectedArt: -1,
    styleToggle: true,
    aboutState: false,
};

const main = (state: TmainState = initialState, action: AnyAction) => {
    switch (action.type) {
        case ACTIONS.selectArt:
            return {
                ...state,
                selectedArt: action.payload
            }
        case ACTIONS.nightToggle:
            return {
                ...state,
                styleToggle: !state.styleToggle
            }
        case ACTIONS.toggleAbout:
            return {
                ...state,
                aboutState: !state.aboutState
            }
        default:
            return state;
    }
};

export default createStore(main);
