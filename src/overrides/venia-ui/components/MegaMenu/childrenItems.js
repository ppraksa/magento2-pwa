import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import resourceUrl from '@magento/peregrine/lib/util/makeUrl';
import defaultClasses from './childrenItems.module.css';
import { useStyle } from "@magento/venia-ui/lib/classify";
/**
 * Children Items for menu nesting
 *
 * @param categories
 * @param categoryUrlSuffix
 * @param keyboardProps
 * @param onNavigate
 * @return {JSX.Element}
 */
const ChildrenItems = ({ categories, categoryUrlSuffix, keyboardProps, onNavigate }) => {
    const classes = useStyle(defaultClasses);

    const childrenItems = categories.map((item, index) => {
        const { url_path, name, children } = item;
        const categoryUrl = resourceUrl(`/${url_path}${categoryUrlSuffix || ''}`);
        const isLastItem = index === categories.length - 1;
        const itemKeyboardProps = isLastItem ? keyboardProps : {};
        let childrenItemsNested = null;

        // In case of nesting make recursive call
        if (children && children.length > 0) {
            childrenItemsNested = (
                <ChildrenItems
                    categories={children}
                    categoryUrlSuffix={categoryUrlSuffix}
                    keyboardProps={keyboardProps}
                    onNavigate={onNavigate}
                />
            );
        }

        return (
            <React.Fragment key={index}>
                <li>
                    <Link
                        {...itemKeyboardProps}
                        data-cy="MegaMenu-SubmenuColumn-link"
                        to={categoryUrl}
                        onClick={onNavigate}
                    >
                        {name}
                    </Link>
                </li>
                {childrenItemsNested}
            </React.Fragment>
        );
    });

    return <ul className={classes.list}>{childrenItems}</ul>;
};

ChildrenItems.propTypes = {
    categories: PropTypes.arrayOf(
        PropTypes.shape({
            url_path: PropTypes.string.isRequired,
            isActive: PropTypes.bool.isRequired,
            name: PropTypes.string.isRequired,
            children: PropTypes.array
        })
    ).isRequired,
    categoryUrlSuffix: PropTypes.string,
    keyboardProps: PropTypes.object,
    onNavigate: PropTypes.func.isRequired
};

export default ChildrenItems;
