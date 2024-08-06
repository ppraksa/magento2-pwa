import React from 'react';
import { Link } from 'react-router-dom';

import resourceUrl from '@magento/peregrine/lib/util/makeUrl';

import { useStyle } from '@magento/venia-ui/lib/classify';
import defaultClasses from './submenuColumn.module.css';
import PropTypes from 'prop-types';

import ChildrenItems from './childrenItems';

/**
 * @inheritDoc
 * @see @magento/venia-ui/lib/components/MegaMenu/submenuColumn.js
 */
const SubmenuColumn = props => {
    const {
        category,
        categoryUrlSuffix,
        onNavigate,
        handleCloseSubMenu
    } = props;
    const classes = useStyle(defaultClasses, props.classes);

    const categoryUrl = resourceUrl(
        `/${category.url_path}${categoryUrlSuffix || ''}`
    );

    let children = null;

    if (category.children.length) {
        const data = {
            keyboard_props: props.keyboardProps,
            categories: category.children,
            categoryUrlSuffix,
            onNavigate,
            classes
        };

        children = <div className={classes.submenuChild}><ChildrenItems {...data} /></div>;
    }

    // setting keyboardProps if category does not have any sub-category
    const keyboardProps = category.children.length ? {} : props.keyboardProps;

    return (
        <div className={classes.submenuColumn}>
            <Link
                {...keyboardProps}
                className={classes.link}
                data-cy="MegaMenu-SubmenuColumn-link"
                to={categoryUrl}
                onClick={() => {
                    handleCloseSubMenu();
                    onNavigate();
                }}
            >
                <span className={classes.heading}>{category.name}</span>
            </Link>
            {children}
        </div>
    );
};

export default SubmenuColumn;

SubmenuColumn.propTypes = {
    category: PropTypes.shape({
        children: PropTypes.array,
        uid: PropTypes.string.isRequired,
        include_in_menu: PropTypes.number,
        isActive: PropTypes.bool.isRequired,
        name: PropTypes.string.isRequired,
        path: PropTypes.array.isRequired,
        position: PropTypes.number.isRequired,
        url_path: PropTypes.string.isRequired
    }).isRequired,
    categoryUrlSuffix: PropTypes.string,
    onNavigate: PropTypes.func.isRequired,
    handleCloseSubMenu: PropTypes.func.isRequired
};
