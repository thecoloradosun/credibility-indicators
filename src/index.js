/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
import { registerBlockType } from '@wordpress/blocks';
import { registerPlugin } from '@wordpress/plugins';
import CredibilityIndicatorsPanel from './credibility-indicators-panel.js';

/**
 * Internal dependencies
 */
import Edit from './edit';
import metadata from './block.json';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
registerBlockType( metadata.name, {
    /**
     * @see ./edit.js
     */
    edit: Edit,
} );

/**
 * We only want this panel on posts, but we don't have a clear way of
 * deregistering it for just the widgets screen, so we check the post type and
 * return early inside the component.
 */
registerPlugin( 'credibility-indicator-panel', { render: CredibilityIndicatorsPanel } );

/**
 * Only allow insertion on the widgets screen.
 *
 * For some reason, this just works. Something must not be loading on the
 * widget screen that causes this to fire. If at some point this block is
 * unable to be used as a widget, look here first.
 */
window.addEventListener( 'load', () => {
    wp.data.dispatch( 'core/edit-post' ).hideBlockTypes( [ 'credibility-indicators/credibility-indicators' ] );
} );
